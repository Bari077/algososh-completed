import React, { useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import style from "./sorting-page.module.css";
import { changeElementsState, swap, delayedPromise } from "../../utils/utils";
import { randArr } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/sorting";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [mode, setMode] = useState("selection");
  const [sortedElements, setSortedElements] = useState<TChar[]>([]);
  const [isLoader, setIsloader] = useState({
    state: false,
    direction: ''});

  const getInitialArrayValue =(arr: number[])=> {
    const initialValue = arr.map((item, index) => ({
      item,
      id: index,
      state: ElementStates.Default
    }))
    return initialValue
  }

  const initialValue = getInitialArrayValue(randArr(3,19,0,100));

  useEffect(()=> {
    setSortedElements(initialValue)
  },[])
  
  const selectionSort =async(arr: TChar[], state: React.Dispatch<React.SetStateAction<TChar[]>>, 
    direction: Direction)=> {
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
  }

  const bubbleSort =async(arr: TChar[], state: React.Dispatch<React.SetStateAction<TChar[]>>,
    direction: Direction)=> {
    for (let i = 0; i < arr.length; i++) {      
      for (let j = 0; j < arr.length - i - 1; j++) {
        switch(direction) {
          case "descending" :
            if (arr[j].item < arr[j + 1].item) { 
              swap(arr, j, (j + 1));
            }
            break;
          case "ascending" :
            if (arr[j].item > arr[j + 1].item) { 
              swap(arr, j, (j + 1));
            }
            break;
        }         
        
        changeElementsState([arr[j], arr[j+1]], ElementStates.Changing);
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

  const handleRandArray =()=> {            
    setSortedElements(initialValue);    
  }

  const handleSorting =async(direction: Direction)=> {
    setIsloader({
      state: true,
      direction: direction});
    switch(mode) {
      case "selection" :
        await selectionSort(sortedElements, setSortedElements, direction);
        break;
      case "bubble" :
        await bubbleSort(sortedElements, setSortedElements, direction);
        break;
    }
    
    setIsloader({
      state: false,
      direction: ''});
  }

 

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.filtersContainer}>
        <div className={style.radioFilters}>
          <RadioInput value="selection" checked={mode === "selection"} label="Выбор"
           onChange={event=> setMode((event.target as HTMLInputElement).value)}
           disabled={isLoader.state}></RadioInput>
          <RadioInput value="bubble" checked={mode === "bubble"} label="Пузырёк"
           onChange={event=> setMode((event.target as HTMLInputElement).value)}
           disabled={isLoader.state}></RadioInput>
        </div>        
        <div className={style.directionFilters}>
          <Button type="button" sorting={Direction.Ascending}
          text="По возрастанию" extraClass={style.button} onClick={()=> handleSorting(Direction.Ascending)}
          isLoader={isLoader.direction === "ascending" ? isLoader.state : false}
          disabled={isLoader.direction !== "ascending" && isLoader.state}></Button>
          <Button type="button" sorting={Direction.Descending}
          text="По убыванию" extraClass={style.button} onClick={()=> handleSorting(Direction.Descending)}
          isLoader={isLoader.direction === "descending" ? isLoader.state : false}
          disabled={isLoader.direction !== "descending" && isLoader.state}></Button>
        </div>        
        <Button type="button" text="Новый массив" 
        extraClass={style.button} onClick={handleRandArray}
        disabled={isLoader.state}></Button>
      </div>
      <div className={style.columnContainer}>
        {sortedElements.length > 0 && 
        sortedElements.map((item)=> 
        <Column index={Number(item.item)} key={item.id} state={item.state}></Column>
        )}        
      </div>
      
    </SolutionLayout>
  );
};
