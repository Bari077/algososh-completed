interface IStack<T> {
    push: (item: T) => void;
    pop: ()=> void;
    peak: ()=> T | null;
    clear: ()=> void;
    getSize: ()=> number;
    getStack: ()=> T[]
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void=> {
        this.container.push(item)
    };

    pop = (): void => {
        if(this.container.length) {
            this.container.pop()
        }
    };

    peak = (): T | null => {
        if(this.container.length > 0) {
            return this.container[this.container.length-1]
        }
        return null
    }

    clear = (): void => {
        this.container.length = 0
    }

    getSize  = (): number => {
        return this.container.length
    }

    getStack = (): T[] => {
        return this.container
    }
}