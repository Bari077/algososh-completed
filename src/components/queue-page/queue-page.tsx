import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TChar } from "../../types/sorting";
import style from "./queue-page.module.css";
import { Queue } from "./utils";
import { queueLength } from "../../constants/algorithm-settings";
import { delayedPromise, changeElementsState } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


export const QueuePage: React.FC = () => {  

  const [isLoader, setIsLoader] = useState({
    enqueue: false,
    dequeue: false
  });
  const [inputValue, setInputValue] = useState('');
  const [queueElements, setQueueElements] = useState<(TChar | null)[]>([]);

  const queue = useMemo(()=> new Queue<TChar>(queueLength),[]);
  const queueArray = queue.getQueue();
  const queueElement = {
    item: '',
    state: ElementStates.Default
  }

  const initialQueueElements = useMemo(()=> queueArray.fill(queueElement),[queue])    


  useEffect(()=> {
    setQueueElements(initialQueueElements)
  },[])

  const handleEnqueue = async(inputValue: string)=> {
    setIsLoader({
      enqueue: true,
      dequeue: false
    });

    const element = {
      item: inputValue,
      state: ElementStates.Changing
    };
    setInputValue("");
    queue.enqueue(element);
    setQueueElements([...queueArray]);
    await delayedPromise(SHORT_DELAY_IN_MS);
    changeElementsState([queueArray[queue.getTailIndex()]], ElementStates.Default);
    setQueueElements([...queueArray]);
    setIsLoader({
      enqueue: false,
      dequeue: false
    });
  };

  const handleDequeue =async()=> {
    setIsLoader({
      enqueue: false,
      dequeue: true
    });
    changeElementsState([queue.peak()], ElementStates.Changing);
    setQueueElements([...queueArray]);
    await delayedPromise(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setQueueElements([...queueArray]);
    setIsLoader({
      enqueue: false,
      dequeue: false
    });
  }

  const resetQueue =()=> {
    queue.clear();
    setQueueElements([...queueArray]);    
  }

  const regexTab = /\S/;  

  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onReset={resetQueue} onSubmit={evt => evt.preventDefault()}>
        <div className={style.queueControl}>
          <Input value={inputValue} 
          onChange={evt=> setInputValue(evt.currentTarget.value)} 
          type = "text" isLimitText = {true} maxLength = {4} 
          extraClass={style.input}></Input>
          <Button type="button" onClick={()=> handleEnqueue(inputValue)} 
          disabled={queue.getTailIndex() === queueLength - 1 || 
          !regexTab.test(inputValue)} isLoader={isLoader.enqueue}
          text="Добавить" ></Button>
          <Button type="button" onClick={handleDequeue}
          disabled={queue.isEmpty()}  isLoader={isLoader.dequeue}
          text="Удалить" ></Button>
        </div>
        <Button type="reset" text="Очистить" 
        disabled={queue.isEmpty() && queue.getHeadIndex() === 0}></Button>
      </form>
      <ul className={style.circleContainer}>
        {queueElements.length > 0 &&
        queueElements.map((element, index) => 
          <Circle index={index} letter={element?.item} state={element?.state} 
          head={!queue.isEmpty() && index === queue.getHeadIndex() ? "head" : ""} 
          tail={!queue.isEmpty() && index === queue.getTailIndex() ? "tail" : ""} 
          key={index}></Circle>
        )}
      </ul>
    </SolutionLayout>
  );
};
