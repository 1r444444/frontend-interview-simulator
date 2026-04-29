import type { Question } from '../types'

export const questions: Question[] = [
  // JavaScript
  {
    id: 1,
    topic: 'javascript',
    question: 'What is a closure?',
    answer:
      'A closure is a function that retains access to variables from its outer (enclosing) scope even after that scope has finished executing. This happens because functions in JavaScript form a closure over the variables defined in their surrounding scope.',
  },
  {
    id: 2,
    topic: 'javascript',
    question: 'What is the difference between var, let and const?',
    answer:
      'var is function-scoped and hoisted (initialized as undefined). let and const are block-scoped and not initialized during hoisting (temporal dead zone). const additionally prevents reassignment, but does not make objects immutable.',
  },
  {
    id: 3,
    topic: 'javascript',
    question: 'What is event delegation?',
    answer:
      'Event delegation is a technique where a single event listener is placed on a parent element to handle events from its children. It relies on event bubbling — events propagate up the DOM tree. Useful for dynamic lists where children are added/removed.',
  },
  {
    id: 4,
    topic: 'javascript',
    question: 'What is the difference between == and ===?',
    answer:
      '== performs type coercion before comparing (e.g., "5" == 5 is true). === checks both value and type without coercion ("5" === 5 is false). Always prefer === to avoid unexpected bugs.',
  },
  {
    id: 5,
    topic: 'javascript',
    question: 'What is a Promise?',
    answer:
      'A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states: pending, fulfilled, and rejected. You can chain .then() for success and .catch() for errors.',
  },
  {
    id: 6,
    topic: 'javascript',
    question: 'What is the event loop?',
    answer:
      "The event loop is JavaScript's mechanism for executing code, collecting and processing events, and executing queued sub-tasks. It allows non-blocking I/O by offloading operations to the browser/Node.js and processing callbacks from the task queue when the call stack is empty.",
  },
  {
    id: 7,
    topic: 'javascript',
    question: 'What is hoisting?',
    answer:
      "Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution. var declarations (not initializations) and function declarations are hoisted. let and const are hoisted but not initialized — accessing them before declaration causes a ReferenceError.",
  },
  {
    id: 8,
    topic: 'javascript',
    question: 'What is the difference between null and undefined?',
    answer:
      'undefined means a variable has been declared but not assigned a value. null is an intentional assignment meaning "no value". typeof undefined is "undefined"; typeof null is "object" (a known JavaScript quirk).',
  },
  {
    id: 9,
    topic: 'javascript',
    question: 'What is a higher-order function?',
    answer:
      'A higher-order function is a function that takes another function as an argument or returns a function. Examples: Array.map(), Array.filter(), Array.reduce(). They are fundamental to functional programming in JavaScript.',
  },
  {
    id: 10,
    topic: 'javascript',
    question: 'What is the difference between call, apply and bind?',
    answer:
      'All three set the `this` context of a function. call(thisArg, arg1, arg2) calls immediately with individual args. apply(thisArg, [args]) calls immediately with an array. bind(thisArg, args) returns a new function with `this` bound, without calling it.',
  },

  // TypeScript
  {
    id: 11,
    topic: 'typescript',
    question: 'What is the difference between interface and type?',
    answer:
      'Both define object shapes. Interfaces are extendable with extends and can be merged (declaration merging). Types are more flexible — they can represent unions, intersections, primitives, and tuples. Prefer interface for object shapes, type for complex compositions.',
  },
  {
    id: 12,
    topic: 'typescript',
    question: 'What is a generic in TypeScript?',
    answer:
      'Generics allow you to write reusable code that works with different types while maintaining type safety. Example: function identity<T>(arg: T): T { return arg }. TypeScript infers T from the argument or you can specify it explicitly.',
  },
  {
    id: 13,
    topic: 'typescript',
    question: 'What is the difference between any and unknown?',
    answer:
      'Both accept any value, but unknown is safer. With any, TypeScript skips all type checks. With unknown, you must narrow the type (via typeof, instanceof, or type guard) before using it. Prefer unknown when the type is truly unknown.',
  },
  {
    id: 14,
    topic: 'typescript',
    question: 'What is a union type?',
    answer:
      'A union type means a value can be one of several types: string | number | boolean. You use type narrowing (typeof, instanceof) to determine which type you\'re working with at runtime.',
  },
  {
    id: 15,
    topic: 'typescript',
    question: 'What is a type guard?',
    answer:
      'A type guard is an expression that narrows the type of a variable within a conditional block. Built-in: typeof, instanceof, in. Custom: a function with return type "arg is Type". Example: function isString(val: unknown): val is string { return typeof val === "string" }.',
  },
  {
    id: 16,
    topic: 'typescript',
    question: 'What is the difference between never and void?',
    answer:
      'void means a function returns nothing (returns undefined). never means a function never returns — it throws an error or runs forever. never is also the result type of exhaustive checks in switch statements.',
  },
  {
    id: 17,
    topic: 'typescript',
    question: 'What are utility types? Name a few.',
    answer:
      'Utility types are built-in generic types that transform other types. Common ones: Partial<T> (all properties optional), Required<T> (all required), Readonly<T> (immutable), Pick<T, K> (select keys), Omit<T, K> (exclude keys), Record<K, V> (object map).',
  },
  {
    id: 18,
    topic: 'typescript',
    question: 'What is an intersection type?',
    answer:
      'An intersection type combines multiple types into one using &. The resulting type has all properties of all combined types. Example: type Admin = User & { adminLevel: number }. Useful for mixins and extending types.',
  },

  // React
  {
    id: 19,
    topic: 'react',
    question: 'What is the difference between state and props?',
    answer:
      "Props are read-only data passed from parent to child — they are external and controlled by the parent. State is local data managed inside a component that can change over time. Changing state triggers a re-render; changing props (from the parent's side) also causes re-render in the child.",
  },
  {
    id: 20,
    topic: 'react',
    question: 'What does useEffect do and when does it run?',
    answer:
      'useEffect runs side effects after render. With no dependency array it runs after every render. With [] it runs once after mount. With [dep1, dep2] it runs when those values change. The optional cleanup function runs before the next effect and on unmount.',
  },
  {
    id: 21,
    topic: 'react',
    question: 'What is the virtual DOM?',
    answer:
      "The virtual DOM is an in-memory representation of the real DOM. When state changes, React creates a new virtual DOM tree and diffs it against the previous one (reconciliation). Only the changed nodes are updated in the real DOM, making updates efficient.",
  },
  {
    id: 22,
    topic: 'react',
    question: 'What is the difference between useMemo and useCallback?',
    answer:
      'useMemo memoizes a computed value: const value = useMemo(() => compute(a, b), [a, b]). useCallback memoizes a function reference: const fn = useCallback(() => doSomething(a), [a]). Both prevent unnecessary recalculations or re-renders in child components.',
  },
  {
    id: 23,
    topic: 'react',
    question: 'What are controlled vs uncontrolled components?',
    answer:
      "A controlled component's form value is driven by React state — you control it via value and onChange. An uncontrolled component stores its own state in the DOM and is accessed via ref. Controlled is preferred for validation and dynamic forms.",
  },
  {
    id: 24,
    topic: 'react',
    question: 'What is the Context API?',
    answer:
      'Context API lets you share data across the component tree without prop drilling. Create context with createContext(), provide it with <Context.Provider value={...}>, and consume it with useContext(). Good for themes, locale, auth — not for frequently changing data.',
  },
  {
    id: 25,
    topic: 'react',
    question: 'What are the rules of hooks?',
    answer:
      'Two rules: 1) Only call hooks at the top level — not inside loops, conditions, or nested functions. 2) Only call hooks from React function components or custom hooks. These rules ensure hook call order is consistent between renders.',
  },
  {
    id: 26,
    topic: 'react',
    question: 'What is React.memo and when should you use it?',
    answer:
      "React.memo is a higher-order component that memoizes a component's render result. It prevents re-rendering if props haven't changed (shallow comparison). Use it for pure components that render often with the same props, especially in large lists.",
  },
  {
    id: 27,
    topic: 'react',
    question: 'What is the key prop and why is it important?',
    answer:
      "The key prop helps React identify which items in a list have changed, been added, or removed. Keys should be stable and unique among siblings. Using index as key can cause bugs when the list is reordered. Use a unique ID from your data instead.",
  },
]

export const questionsByTopic = (topic: string) =>
  questions.filter((q) => q.topic === topic)
