import React, { FormEventHandler, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TChar } from "../../types/sorting";
import { stringMaxChar } from "../../constants/algorithm-settings";
import { reverse, getStringArrayWithOptions } from "./utils";


export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('')
  const [reverseElements, setReverseElements] = useState<TChar[]>([]);
  const [isLoading, setIsLoading] = useState(false); 

  

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
    setValue(e.target.value);
  }  

  const handleSubmit: FormEventHandler<HTMLFormElement> =async(evt)=> {
    evt.preventDefault();
    setIsLoading(true);
    const initialValue = getStringArrayWithOptions(value);
    setReverseElements(initialValue);
    await reverse(initialValue, setReverseElements);
    setIsLoading(false)   
  }
  
  return (
    <SolutionLayout title="Строка">
      <form onSubmit={handleSubmit} >
        <div className={style.container}>
          <Input value={value} onChange={handleChange} type = "text" isLimitText = {true} maxLength = {stringMaxChar} extraClass={style.input}></Input>
          <Button text='Развернуть' type="submit" isLoader={isLoading}
           disabled={value.length === 0 ? true : false}></Button>
        </div>        
      </form>
      <ul className={style.circleContainer}>
        {reverseElements.length > 0 && reverseElements.map((element)=> 
          <Circle letter={element.item} key={element.id} state={element.state}></Circle>
        )}
      </ul>      
    </SolutionLayout>
  )

}
