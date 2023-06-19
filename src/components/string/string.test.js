import { ElementStates } from "../../types/element-states";
import { reverse, getStringArrayWithOptions } from "./utils";
import { hasArrayOtherStateElement } from "../../utils/utils";

const mock = jest.fn();

const createStringFromArray  =(array)=> {
   return array.reduce((acc, element)=> (acc += element.item), '')
}



describe('String', ()=> {
    it('should convert string to array', ()=> {
        const stringArrayWithOptions = getStringArrayWithOptions('test');
        expect(stringArrayWithOptions).toEqual([
            { item: 't', id: 0, state: ElementStates.Default }, 
            { item: 'e', id: 1, state: ElementStates.Default },
            { item: 's', id: 2, state: ElementStates.Default },
            { item: 't', id: 3, state: ElementStates.Default },
        ])
    });

    it('should reverse even number chars string', async ()=> {
        const value = getStringArrayWithOptions('eventest');
        await reverse(value, mock);
        expect(createStringFromArray(value)).toEqual('tsetneve');
        expect(hasArrayOtherStateElement(value, ElementStates.Modified)).toBeFalsy();
    });

    it('should reverse one char string', async ()=> {
        const value = getStringArrayWithOptions('x');
        await reverse(value, mock);
        expect(createStringFromArray(value)).toEqual('x');
        expect(hasArrayOtherStateElement(value, ElementStates.Modified)).toBeFalsy();
    });

    it('should reverse an empty string', async ()=> {
        const value = getStringArrayWithOptions('');
        await reverse(value, mock);
        expect(createStringFromArray(value)).toEqual('');
    });
})

