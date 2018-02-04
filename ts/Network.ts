/// <reference path="./Layer.ts"/>

module NeuralTS {
    export enum TransferFunctions {
        LogSigmoid,
        HardLimit,
        SaturatingLinear,
        PositiveLinear
    }

    export class Network {
        public static tF = TransferFunctions.LogSigmoid;
        numInputs: number;
        numHidden: number;
        perHidden: number;
        numOutputs: number;

        numNeurons: number;
        numWeights: number;

        numLayers: number
        layers: Layer[];

        constructor(_NumInputs: number, _NumHidden: number, _PerHidden: number, _NumOutputs: number) {
            this.numInputs = _NumInputs;
            this.numHidden = _NumHidden;
            this.perHidden = _PerHidden;
            this.numOutputs = _NumOutputs;
            this.numNeurons = this.numInputs + (this.numHidden * this.perHidden) + this.numOutputs;
            this.numWeights = ((this.numInputs + 1) * this.perHidden) + ((this.perHidden + 1) * this.perHidden) * (this.numHidden - 1) + ((this.perHidden + 1) * this.numOutputs);
            this.numLayers = this.numHidden + 1;
            this.layers = new Array(this.numLayers);

            var iCurLayer = 0;
            var i;

            if (this.numHidden > 0) {
                this.layers[iCurLayer] = new Layer(this.perHidden, this.numInputs);
                iCurLayer++;
                for (i = 1; i < this.numHidden; i++) {
                    this.layers[iCurLayer] = new Layer(this.perHidden, this.perHidden);

                    iCurLayer++;
                }
                this.layers[iCurLayer] = new Layer(this.numOutputs, this.perHidden);

            }
            else
                this.layers[iCurLayer] = new Layer(this.numOutputs, this.numInputs);
        }

        public FeedData(input: number[]): number[] {
            let curInput: number[];
            let curOutput: number[] = [];
            var i, j, k;
            var netInput: number;

            curInput = input;

            for (i = 0; i < this.numLayers; i++) {
                curOutput = new Array(this.layers[i].numNeurons);
                for (j = 0; j < this.layers[i].numNeurons; j++) {
                    netInput = 0;
                    for (k = 0; k < this.layers[i].Neuron(j).numInputs - 1; k++)
                        netInput += (curInput[k] * this.layers[i].Neuron(j).GetWeight(k));
                    netInput -= this.layers[i].Neuron(j).GetWeight(k);
                    curOutput[j] = Network.TransferFunction(netInput);
                }

                if (i < (this.numLayers - 1))
                    curInput = curOutput;
            }

            return curOutput;

        }

        public static TransferFunction(netinput: number): number {
            switch (Network.tF) {
                case TransferFunctions.LogSigmoid:
                    return (1 / (1 + Math.exp(-netinput)));
                case TransferFunctions.HardLimit:
                    if (netinput < 0)
                        return 0;
                    else
                        return 1;
                case TransferFunctions.SaturatingLinear:
                    if (netinput < 0)
                        return 0;
                    else if (netinput > 1)
                        return 1;
                    else
                        return netinput;
                case TransferFunctions.PositiveLinear:
                    return (netinput > 0) ? netinput : 0;
            }
            return 0;
        }
    }
}
