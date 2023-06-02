export interface INode<T> {
    value: T;
    next: Node<T> | null;
}

export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    insertAt: (element: T, index: number) => void;
    removeFrom: (index: number) => void;
    getSize: () => number;
    getHead: () => Node<T> | null;
    getTail: () => Node<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    prepend =(element: T) => {
        const node = new Node(element);
        if(this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    append =(element: T) => {
        const node = new Node(element);
        let current;
        if(this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            current = this.head;
            while(current.next) {
                current = current.next
            }
            current.next = node;
            this.tail = node;
        }
        this.size++;
    }

    insertAt =(element: T, index: number) => {
        if(index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        };
        switch(index) {
            case 0 :        
                this.prepend(element);
                break;
            case (this.size) :
                this.append(element);
                break;
            default :

            const node = new Node(element);
            node.next = this.head;
            let current = this.head;
            let previous = null;
            let currentIndex = 0;
            while(current && currentIndex < index) {
                previous = current;
                current = current.next;
                currentIndex++;
            }
            node.next = current;
            if(previous) {
                previous.next = node
            }
            this.size++;
        };
    };

    removeFrom =(index: number) => {
        if(index < 0 || index > this.size-1 || !this.head) {
            console.log('Enter a valid index');
            return;
        }

        switch(index) {
            case 0 :        
                const newHead = this.head.next;
                this.head.next = null;
                this.head = newHead;
                break;
            default :

            let current = this.head.next;
            let previous = this.head;
            let currentIndex = 0;
            while(current && currentIndex < index-1) {
                previous = current;
                current = current.next;
                currentIndex++
            };
            if(current?.next) {
                previous.next = current.next;
                current.next = null;
            } else {
                current = previous;
                current.next = null;
                this.tail = current
            }
            
        }

        this.size--;
        if(this.size === 1) {
            this.tail = this.head
        }

        if(this.size === 0) {
            this.tail = null
        }
    };

    getSize =() => {
        return this.size
    };

    getHead =() => {
        return this.head
    };

    getTail =() => {
        return this.tail
    };
}