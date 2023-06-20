import React, { useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import style from "./sorting-page.module.css";
import { randArr } from "../../utils/utils";
import { TChar } from "../../types/sorting";
import { sortSettings } from "../../constants/algorithm-settings";
import { getInitialArrayWithOptions, sortBySelection, sortByBubble } from "./utils";

export const SortingPage: React.FC = () => {
  const [mode, setMode] = useState("selection");
  const [sortedElements, setSortedElements] = useState<TChar[]>([]);
  const [isLoader, setIsloader] = useState({
    state: false,
    direction: ''
  });

  const initialValue = getInitialArrayWithOptions(randArr(
  sortSettings.minQtyElements, sortSettings.maxQtyElements, 
  sortSettings.minValue, sortSettings.maxValue));

  useEffect(()=> {
    setSortedElements(initialValue)
  },[]);
  

  const handleRandArray =()=> {            
    setSortedElements(initialValue);    
  };

  const handleSorting =async(direction: Direction)=> {
    setIsloader({
      state: true,
      direction: direction});
    switch(mode) {
      case "selection" :
        await sortBySelection(sortedElements, setSortedElements, direction);
        break;
      case "bubble" :
        await sortByBubble(sortedElements, setSortedElements, direction);
        break;
    };
    
    setIsloader({
      state: false,
      direction: ''});
  }

 

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.filtersContainer} data-cy="sorting">
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
      </form>
      <div className={style.columnContainer}>
        {sortedElements.length > 0 && 
        sortedElements.map((item)=> 
        <Column index={Number(item.item)} key={item.id} state={item.state}></Column>
        )}        
      </div>
      
    </SolutionLayout>
  );
};
