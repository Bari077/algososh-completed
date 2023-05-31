import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import style from "./list-page.module.css";
import { LinkedList, INode } from "./utils";
import { TChar } from "../../types/sorting";
import { ElementStates } from "../../types/element-states";
import { delayedPromise, changeElementsState, randArr } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ActionStates } from "../../types/list-action-states";


export const ListPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState({
    state: false,
    action : ''
  });
  const [value, setInputValue] = useState('');
  const [indexValue, setIndexValue] =useState('');
  const [listElements, setListElements] = useState<TChar[]>([]);
  const nodeList = useMemo(() => new LinkedList<string>(), []);

  const initialItems: Array<string> = ['Y','A','N','D','E','X'];

  useEffect(()=> {
    initialItems.forEach(item => {
      nodeList.append(item);
      const element = {
        item: item,
        head: nodeList.getSize() === 1 ?
        'head' : undefined,
        tail: nodeList.getSize() === initialItems.length ?
        'tail' : undefined,
        state: ElementStates.Default,        
      }
      listElements.push(element);
      setListElements([...listElements]);
    });
  },[])

  const addFirst =async(value: string)=> {    
    const newChar = (
      <Circle letter={value} 
      state={ElementStates.Changing} isSmall></Circle>
    )
    let element : TChar = {
      item: '',
      head: newChar      
    }

    listElements[0] = element;
    setListElements([...listElements])
    await delayedPromise(SHORT_DELAY_IN_MS);

    element = {
      item: `${nodeList.getHead()?.value}`,
      state: ElementStates.Modified,
      head: 'head',
      tail: 'tail'
    }
    listElements[0] = element
    setListElements([...listElements]);
    await delayedPromise(SHORT_DELAY_IN_MS);

    listElements[0].state = ElementStates.Default;
    setListElements([...listElements]);    
  }


  const addByIndex = async (value: string, index: number) => {
    if(index < 0 || index > listElements.length - 1) {
      throw new Error('Enter a valid index');
    }
    const newChar = (
      <Circle letter={value} state={ElementStates.Changing} isSmall />
    );    
    
    let current = nodeList.getHead() as INode<string>;
    let position = 0;

    let prevHead = listElements[position].head;
    listElements[position].head = newChar;
    setListElements([...listElements]);

    await delayedPromise(SHORT_DELAY_IN_MS);

    while (position < index) {
      listElements[position].head = prevHead;
      listElements[position].state = ElementStates.Changing;
      if (current.next) {
        current = current.next;
      }
      position++;
      if (!listElements[position]) {
        listElements.push({
          item: '',
          head: position === 0 ? 'head' : undefined,
          tail: 'tail',
        });
      }
      prevHead = listElements[position].head;
      listElements[position].head = newChar;
      setListElements([...listElements]);
      await delayedPromise(SHORT_DELAY_IN_MS);
    }

    listElements[position].head = prevHead;

    if (index === 0) {
      listElements[0].head = undefined;
    }

    if (position === nodeList.getSize() - 1) {
      listElements[position].item = current.value;
    } else {
      listElements.splice(position, 0, {
        item: current.value,
        head: position === 0 ? 'head' : undefined,
        tail: position === listElements.length ? 'tail' : undefined,
      });
    }
    listElements[position].state = ElementStates.Modified;
    setListElements([...listElements]);
    await delayedPromise(SHORT_DELAY_IN_MS);
    changeElementsState(listElements, ElementStates.Default);
    setListElements([...listElements]);
    
  };



  const addInTail =async(value: string)=> {    
    const newChar = (
      <Circle letter={value} 
      state={ElementStates.Changing} isSmall></Circle>
    )
    const lastElement = listElements[listElements.length-1];    
    lastElement.head = newChar;
    setListElements([...listElements]);
    await delayedPromise(SHORT_DELAY_IN_MS);

    nodeList.append(value);
    lastElement.head = listElements.indexOf(lastElement) === 0 ?
    'head' : undefined;
    listElements.push({
      item : `${nodeList.getTail()?.value}`,
      tail: 'tail',
      state: ElementStates.Modified
    });
    listElements[listElements.length-2].tail = undefined;
    setListElements([...listElements]);    
    await delayedPromise(SHORT_DELAY_IN_MS);

    
    listElements[listElements.length-1].state = ElementStates.Default;    
    setListElements([...listElements]);           
  }

  const removeElement = async(index: number, fromTail: boolean)=> {
    const elementToRemove = listElements[index];
    const removedElement = (
      <Circle letter={elementToRemove.item} 
      state={ElementStates.Changing} isSmall></Circle>
    );
    
    
    if(fromTail) {
      elementToRemove.item = '';
      elementToRemove.tail = removedElement;
      setListElements([...listElements]);
      await delayedPromise(SHORT_DELAY_IN_MS);
      nodeList.removeFrom(index);
      listElements.pop();
    } else {
      let position = 0 ;    
      while(position <= index) {
        listElements[position].state = ElementStates.Changing;
        setListElements([...listElements]);
        await delayedPromise(SHORT_DELAY_IN_MS);
        position++;
      }
      elementToRemove.tail = removedElement;
      elementToRemove.item = '';
      setListElements([...listElements]);
      await delayedPromise(SHORT_DELAY_IN_MS);

      nodeList.removeFrom(index);
      listElements.splice(index,1);
      changeElementsState(listElements, ElementStates.Default);
    }

    if(listElements.length > 0 && index === listElements.length) {
      listElements[listElements.length-1].tail = 'tail'
    };

    if(listElements.length > 0 && index === 0) {
      listElements[0].head = 'head'
    };
    
    setListElements([...listElements]); 
  }



  const handleAddInHead = async(value: string)=> {
    setInputValue('');
    setIsLoader({
      state: true,
      action: ActionStates.AddInHead
    })
    const index = 0;
    nodeList.insertAt(value, index);
    listElements.length > 0 ? 
    await addByIndex(value, index) : await addFirst(value);
    setIsLoader({
      state: false,
      action: ActionStates.AddInHead
    })     
  }

  const handleAddInTail = async(value: string)=> {
    setInputValue('');
    setIsLoader({
      state: true,
      action: ActionStates.AddInTail
    });
    await addInTail(value);
    setIsLoader({
      state: false,
      action: ActionStates.AddInTail
    });
  }

  const handleAddByIndex = async(value: string, index: number) => {
    setInputValue('');
    setIndexValue('');
    setIsLoader({
      state: true,
      action: ActionStates.AddByIndex
    });
    nodeList.insertAt(value, index);
    await addByIndex(value, index);
    setIsLoader({
      state: false,
      action: ActionStates.AddByIndex
    })    
  }

  const handleDeleteHead = async ( index = 0 )=> {
    setIsLoader({
      state: true,
      action: ActionStates.DeleteFromHead
    });
    await removeElement(index, false);
    setIsLoader({
      state: false,
      action: ActionStates.DeleteFromHead
    });
  }

  const handleDeleteTail = async (index = (nodeList.getSize()-1))=> {
    setIsLoader({
      state: true,
      action: ActionStates.DeleteFromTail
    });
    await removeElement(index, true);
    setIsLoader({
      state: false,
      action: ActionStates.DeleteFromTail
    });
  }

  const handleDeleteByIndex = async (index: number)=> {
    setIndexValue('');
    setIsLoader({
      state: true,
      action: ActionStates.DeleteByIndex
    });
    await removeElement(index, false);
    setIsLoader({
      state: false,
      action: ActionStates.DeleteByIndex
    });
  }

  const regexTab = /\S/;
  


  return (
    <SolutionLayout title="Связный список">
      <form className={style.form}>
        <Input value={value} 
        onChange={evt=> setInputValue(evt.currentTarget.value)}
        isLimitText = {true} maxLength = {4} 
        placeholder = "Введите значение"
        ></Input>
        <Button text="Добавить в head" 
        onClick={()=>handleAddInHead(value)}
        isLoader={isLoader.action === ActionStates.AddInHead ? 
        isLoader.state : false} 
        disabled={isLoader.state || !regexTab.test(value)}></Button>
        <Button text="Добавить в tail" 
        onClick={()=> handleAddInTail(value)} 
        isLoader={isLoader.action === ActionStates.AddInTail ? 
        isLoader.state : false}
        disabled={isLoader.state || !regexTab.test(value) 
        || nodeList.getSize() === 0}></Button>
        <Button text="Удалить из head" 
        onClick={()=> handleDeleteHead()} 
        isLoader={isLoader.action === ActionStates.DeleteFromHead ? 
        isLoader.state : false} 
        disabled={isLoader.state || nodeList.getSize() === 0}></Button>
        <Button text="Удалить из tail" 
        onClick={()=> handleDeleteTail()}
        isLoader={isLoader.action === ActionStates.DeleteFromTail ? 
        isLoader.state : false} 
        disabled={isLoader.state || nodeList.getSize() === 0}></Button>
        <Input value={indexValue}
        onChange={evt=> setIndexValue(evt.currentTarget.value)} 
        placeholder = "Введите индекс" type = "number"></Input>
        <Button extraClass={style.button_wide} 
        text="Добавить по индексу" 
        onClick={()=> handleAddByIndex(value, Number(indexValue))} 
        isLoader={isLoader.action === ActionStates.AddByIndex ? 
        isLoader.state : false} 
        disabled={isLoader.state || !regexTab.test(value) ||
        Number(indexValue) < 0 || Number(indexValue) > listElements.length-1 ||
        !regexTab.test(indexValue)}></Button>
        <Button extraClass={style.button_wide} 
        text="Удалить по индексу"
        onClick={()=> handleDeleteByIndex(Number(indexValue))} 
        isLoader={isLoader.action === ActionStates.DeleteByIndex ? 
        isLoader.state : false} 
        disabled={isLoader.state || nodeList.getSize() === 0 || 
        Number(indexValue) < 0 || Number(indexValue) > listElements.length-1
        || !regexTab.test(indexValue)}></Button>
      </form>
      <ul className={style.circleContainer}>
        {listElements.length > 0 && 
        listElements.map((element, index)=> (
          <li className={style.listItem} key={index}>
            <Circle letter={element.item} 
            head={element.head}
            tail={element.tail !== undefined ? 
            (<div className={style.tailCaption}>
              <div>{index}</div>
              <div className={style.tailElement}>{element.tail}</div>
            </div>) : 
            `${index}`}
            state={element.state}></Circle>
            {index < listElements.length-1 && <ArrowIcon></ArrowIcon>}
          </li>
        ))}       
      </ul>
    </SolutionLayout>
  );
};
