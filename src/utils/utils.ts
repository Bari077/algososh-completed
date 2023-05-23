import { ElementStates } from "../types/element-states";
import { TChar } from "../types/sorting";

export const delayedPromise =async(timeout: number)=> {
   await new Promise(resolve => setTimeout(resolve, timeout));
};

export const swap = (arr: TChar[], j: number, k: number)=> {
    [arr[j], arr[k]] = [arr[k], arr[j]]
  }

export const changeElementsState = (elements: any[], state: ElementStates) => {
    elements.forEach((element) => (element.state = state));
  };