interface IQueue<T> {
    enqueue : (item: T) => void;
    dequeue : () => void;
    peak : ()=> T | null;
    getQueue: ()=> (T | null)[];
    getHeadIndex: ()=> number;
    getTailIndex: ()=> number;
    clear: () => void;
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor (size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if(this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        if(this.isEmpty()) {
            throw new Error("No elements in queue");
        }
        delete this.container[this.head % this.size];
        this.head++;
        this.length--;
    };

    peak =(): T | null => {
        if(this.isEmpty()) {
            throw new Error("No elements in queue");
        }
        return this.container[this.head % this.size]
    };

    getQueue =(): (T | null)[] => {
        return this.container
    };

    getHeadIndex = () => {
        return this.head
    };

    getTailIndex = () => {
        return this.tail - 1
    };

    clear = () => {
        this.container.forEach((el, index)=> {
            delete this.container[index]
        })
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    isEmpty =()=> this.length === 0 ;
}


