module NeuralTS {
	export class Neuron {
		numInputs: number;
		weights: number[];
		constructor(initNumInputs: number) {
			this.numInputs = initNumInputs + 1;
			this.weights = new Array(this.numInputs);

			for (var i = 0; i < this.numInputs; i++)
				this.weights[i] = (Math.random() * 2) - 1;
		}
		
		public SetWeight(index: number, newVal: number): void {
			this.weights[index] = newVal;
		}

		public GetWeight(index: number): number {
			return this.weights[index];
		}
	}
	
}
