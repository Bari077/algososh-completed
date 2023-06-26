import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { sortBySelection, sortByBubble, getInitialArrayWithOptions } from "./utils";
import { hasArrayOtherStateElement } from "../../utils/utils";

const mock = jest.fn();

const getArrayOfNumbers =(array)=> array.map(element=> element.item);

describe('SelectionSort', ()=> {
    it('should get Array<TChar>', ()=> {
        const array = getInitialArrayWithOptions([10, 20, 30]);
        expect(array).toEqual([
            { item: 10, id: 0, state: ElementStates.Default }, 
            { item: 20, id: 1, state: ElementStates.Default },
            { item: 30, id: 2, state: ElementStates.Default },
        ])
    })
    it('should correctly sort an empty array', async ()=> {
        const array = [];
        await sortBySelection(array, mock, Direction.Ascending);
        expect(array).toEqual([]);
    });

    it('should correctly sort array of one element', async ()=> {
        const array = getInitialArrayWithOptions([10]);
        await sortBySelection(array, mock, Direction.Ascending);
        expect(getArrayOfNumbers(array)).toEqual([10]);
        expect(hasArrayOtherStateElement(array, ElementStates.Modified)).toBeFalsy();
    });

    it('should correctly sort array in ascending direction', async ()=> {
        const array = getInitialArrayWithOptions([10,25,12,7]);
        await sortBySelection(array, mock, Direction.Ascending);
        expect(getArrayOfNumbers(array)).toEqual([7,10,12,25]);
        expect(hasArrayOtherStateElement(array, ElementStates.Modified)).toBeFalsy();
    });

    it('should correctly sort array in descending direction', async ()=> {
        const array = getInitialArrayWithOptions([10,25,12,7]);
        await sortBySelection(array, mock, Direction.Descending);
        expect(getArrayOfNumbers(array)).toEqual([25,12,10,7]);
        expect(hasArrayOtherStateElement(array, ElementStates.Modified)).toBeFalsy();
    });
});

describe('BubbleSort', ()=> {
    it('should correctly sort an empty array', async ()=> {
        const array = [];
        await sortByBubble(array, mock, Direction.Ascending);
        expect(array).toEqual([]);
    });

    it('should correctly sort array of one element', async ()=> {
        const array = getInitialArrayWithOptions([10]);
        await sortByBubble(array, mock, Direction.Ascending);
        expect(getArrayOfNumbers(array)).toEqual([10]);
        expect(hasArrayOtherStateElement(array, ElementStates.Modified)).toBeFalsy();
    });

    it('should correctly sort array in ascending direction', async ()=> {
        const array = getInitialArrayWithOptions([10,25,12,7]);
        await sortByBubble(array, mock, Direction.Ascending);
        expect(getArrayOfNumbers(array)).toEqual([7,10,12,25]);
        expect(hasArrayOtherStateElement(array, ElementStates.Modified)).toBeFalsy();
    });

    it('should correctly sort array in descending direction', async ()=> {
        const array = getInitialArrayWithOptions([10,25,12,7]);
        await sortByBubble(array, mock, Direction.Descending);
        expect(getArrayOfNumbers(array)).toEqual([25,12,10,7]);
        expect(hasArrayOtherStateElement(array, ElementStates.Modified)).toBeFalsy();
    });
})