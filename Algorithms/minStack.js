/**
 * @file An implementation of the minStack problem using a stack
 * Created Apr 30 2018
 */

class Stack {
    constructor () {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length == 0;
    }
}

/** 
 * Implementation of MinStack that stores the differences between the element and the min
 */
class MinStack {
  constructor () {
    this.min = null;
    this.stack = new Stack();
  }

  push (element) {
    if (this.stack.isEmpty()) {
      this.stack.push(0);
      this.min = element;
    } else {
      this.stack.push(element - this.min);
      if (element < this.min) this.min = element;
    }
  }

  pop () {
    if (this.stack.isEmpty()) return;

    let pop = this.stack.pop();

    if (pop < 0) {
      let newMin = this.min;
      this.min = this.min - pop;
      return newMin;
    }
    return pop + this.min;
  }

  peek () {
    let top = this.stack.peek();

    if (top < 0) {
      return this.min;
    } else {
      return top + this.min;
    }
  }

  getMin () {
    return this.min;
  }
}


// Test
let testStack = new MinStack();

testStack.push(5);
testStack.push(7);
testStack.push(4);
console.log('Peek', testStack.peek());
console.log('getMin', testStack.getMin());
testStack.pop();
console.log('Peek', testStack.peek());
console.log('getMin', testStack.getMin());
