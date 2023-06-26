import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/sorting";
import { changeElementsState, swap, delayedPromise } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";

export const getInitialArrayWithOptions =(arr: number[])=> {
    const initialArray = arr.map((item, index) => ({
      item,
      id: index,
      state: ElementStates.Default
    }))
    return initialArray
}

export const sortBySelection =async(arr: TChar[], state: React.Dispatch<React.SetStateAction<TChar[]>>, 
    direction: Direction)=> {
    if(arr.length === 0) {
        return 
    }
    for(let i=0; i < arr.length-1; i++) {
      let minInd = i;
      for(let j=i+1; j < arr.length; j++) {         
        changeElementsState([arr[i], arr[j]], ElementStates.Changing);
        state([...arr]);
        switch(direction) {
          case "descending" :
            if(arr[j].item > arr[minInd].item) {
              minInd = j          
            };
            break;
          case "ascending" :
            if(arr[j].item < arr[minInd].item) {
              minInd = j          
            };
            break;
        }        
        await delayedPromise(SHORT_DELAY_IN_MS)        
        changeElementsState([arr[j]], ElementStates.Default);               
      }
      
      swap(arr, i, minInd);
      changeElementsState([arr[i]], ElementStates.Modified);
      if(minInd !== i) {
        changeElementsState([arr[minInd]], ElementStates.Default);
      }      
      state([...arr]);
    }    
    await delayedPromise(SHORT_DELAY_IN_MS)
    changeElementsState([arr[arr.length-1]], ElementStates.Modified);
    state([...arr]);
};

export const sortByBubble =async(arr: TChar[], state: React.Dispatch<React.SetStateAction<TChar[]>>,
    direction: Direction)=> {
    if(arr.length === 0) {
        return 
    }
    for (let i = 0; i < arr.length; i++) {      
      for (let j = 0; j < arr.length - i - 1; j++) {
        switch(direction) {
          case "descending" :
            if (arr[j].item < arr[j + 1].item) { 
              swap(arr, (j + 1), j);
            }
            break;
          case "ascending" :
            if (arr[j].item > arr[j + 1].item) { 
              swap(arr, (j + 1), j);
            }
            break;
        }         
        
        changeElementsState([arr[j+1], arr[j]], ElementStates.Changing);
        state([...arr]);
        await delayedPromise(SHORT_DELAY_IN_MS);
        changeElementsState([arr[j]], ElementStates.Default);
        changeElementsState([arr[j+1]], ElementStates.Modified);
        state([...arr]);
      }
    }
    await delayedPromise(SHORT_DELAY_IN_MS);
    changeElementsState([arr[0]], ElementStates.Modified);
    state([...arr]);    
}