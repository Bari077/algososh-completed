import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/sorting";
import style from "./stack-page.module.css";
import { Stack } from "./utils";
import { delayedPromise, changeElementsState } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [stackElements, setStackElements] = useState<TChar[]>([]);
  const stack = useMemo(()=> new Stack<TChar>(),[]);
  const stackArray = stack.getStack();
  const stackTop = stack.peak();    

  const handleAddInStack = async(inputValue: string)=> {    
    const element: TChar = {
      item: inputValue,
      id: stack.getSize(),
      state: ElementStates.Changing
    }
    setInputValue('');
    stack.push(element);
    setStackElements([...stackArray]);
    await delayedPromise(SHORT_DELAY_IN_MS);
    changeElementsState([element], ElementStates.Default);
    setStackElements([...stackArray]);    
  }

  const handleDeleteFromStack = async()=> {    
    changeElementsState([stack.peak()], ElementStates.Changing);
    setStackElements([...stackArray]);
    await delayedPromise(SHORT_DELAY_IN_MS);    
    stack.pop();        
    setStackElements([...stackArray]);
  }

  const resetStack =()=> {
    stack.clear();
    setStackElements([...stackArray]);
  }

  const flexCircleContainerStyle = stackElements.length > 10 ? `${style.circleContainer_flexStart}` : '';
  const regexTab = /\S/;

  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onReset={resetStack}>
        <div className={style.stackControl}>
          <Input value={inputValue} 
          onChange={evt=> setInputValue(evt.currentTarget.value)} 
          type = "text" isLimitText = {true} maxLength = {4}
          extraClass={style.input}></Input>
          <Button type="button" 
          onClick={()=> handleAddInStack(inputValue)}
           text="Добавить" 
           disabled={!regexTab.test(inputValue)}></Button>
          <Button type="button" onClick={handleDeleteFromStack} 
          text="Удалить" disabled={!stackArray.length ? true : false}></Button>
        </div>
        <Button type="reset" text="Очистить"
         disabled={!stackArray.length ? true : false}></Button>
      </form>
      <ul className={`${style.circleContainer} ${flexCircleContainerStyle}`}>
        {stackElements.length > 0 &&
        stackElements.map((element, index) => 
          <Circle index={index} letter={element.item} state={element.state}
           head={index === stackTop?.id ? "top" : null} key={element.id}></Circle>
        )}
      </ul>
    </SolutionLayout>
  );
};
