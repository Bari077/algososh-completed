import { TChar } from "../../types/sorting";
import { changeElementsState, delayedPromise, swap } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";


export const  getStringArrayWithOptions =(value: string): TChar[]=> 
    value.split('').map((item, index) =>({
        item,
        id: index,
        state: ElementStates.Default
}));


export const reverse = async(stringArray: TChar[], state: React.Dispatch<React.SetStateAction<TChar[]>>) => {
    let start = 0;
    let end = stringArray.length-1;
    while(start <= end) {            
      changeElementsState([stringArray[start], stringArray[end]], ElementStates.Changing);
      state([...stringArray]);
      await delayedPromise(DELAY_IN_MS);    
      swap(stringArray, start, end);
      changeElementsState([stringArray[start], stringArray[end]], ElementStates.Modified);
      state([...stringArray]);
      start ++ ;
      end --;
    }
  }