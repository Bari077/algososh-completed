import React, {useState, FormEventHandler} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './fibonacci.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delayedPromise } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fibonacciElements, setFibonacciElements] = useState<number[]>([]);


  const getFibonacci = (n: number)=> {
    let array = [1,1];    
    let i = 2
    while(i <= n) {      
      array.push((array[i-2] + array[i-1]));      
      i++;      
    }
    return array
  }
  
  const handleSubmit: FormEventHandler<HTMLFormElement> =async(e)=> {
    e.preventDefault();
    setIsLoading(true);    
    const fibonacci = getFibonacci(Number(value))   
    for(let i = 1; i <= fibonacci.length; i++) {
      await delayedPromise(DELAY_IN_MS)
      setFibonacciElements([...fibonacci.slice(0, i)])
    }    
    setIsLoading(false)
  }

  const flexCircleContainerStyle = fibonacciElements.length > 10 ? `${style.circleContainer_flexStart}` : '';

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleSubmit}>
        <div className={style.container}>
          <Input value = {value} onChange={evt=> setValue(evt.currentTarget.value)} type = "number" isLimitText = {true} max = {19} extraClass={style.input}></Input>
          <Button text='Рассчитать' type="submit" isLoader={isLoading}
           disabled={ Number(value) > 0 && Number(value) < 20 && Number.isInteger(Number(value)) ? false : true}></Button>
        </div>        
      </form>
      <ul className={`${style.circleContainer} ${flexCircleContainerStyle}`}>
        {fibonacciElements.length > 0 && fibonacciElements.map((element, index)=> 
          <Circle letter={element} key={index} index={index} extraClass={style.circle}></Circle>
        )}
      </ul>  
    </SolutionLayout>
  );
};
