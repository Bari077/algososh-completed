import { ElementStates } from "../types/element-states";
import { TChar } from "../types/sorting";

export const delayedPromise =async(timeout: number)=> {
   await new Promise(resolve => setTimeout(resolve, timeout));
};

export const swap = (arr: TChar[] | number[], j: number, k: number)=> {
    [arr[j], arr[k]] = [arr[k], arr[j]]
}

export const changeElementsState = (elements: any[], state: ElementStates) => {
    elements.forEach((element) => (element.state = state));
};

export const getRandomIntInclusive =(min: number, max: number)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randArr =(minQtyElements: number, maxQtyElements: number,
  minValue: number, maxValue: number)=> {
  let arr = [];
  const length = getRandomIntInclusive(minQtyElements, maxQtyElements);
  while(arr.length < length) {
    arr.push(getRandomIntInclusive(minValue, maxValue))
  }
  return arr
}
