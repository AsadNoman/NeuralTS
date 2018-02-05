/// <reference path="./Neuron.ts"/>

module NeuralTS {

	export class Layer {
		numNeurons: number;
		inputsPerNeuron: number;
		neurons: Neuron[];

		constructor(initNumNeurons: number, initInputsPerNeuron: number) {
			this.numNeurons = initNumNeurons;
			this.inputsPerNeuron = initInputsPerNeuron;

			this.neurons = new Array(this.numNeurons);
			for (var i = 0; i < this.numNeurons; i++)
				this.neurons[i] = new Neuron(this.inputsPerNeuron);
		}

		public Neuron(index: number): Neuron {
			return this.neurons[index];
		}
	}
}
