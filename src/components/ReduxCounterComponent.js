import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCounter, decrementCounter, resetCounter } from './counterActions';  // Import action creators

// THIS IS WHEN I USED counterAction in place of ReduxSlice auto generated actions
function ReduxCounterComponent() {
    const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  console.log('Current count: ', count);

  return (
    <div>
      <h1>Counter: {count}</h1><button className="bg-slate-600 text-white mr-7"  onClick={() => dispatch(incrementCounter())}>Increment</button>
      <button className="bg-slate-600 text-white mr-7" onClick={() => dispatch(decrementCounter())}>Decrement</button>
      <button className="bg-slate-600 text-white mr-7" onClick={() => dispatch(resetCounter())}>Reset</button>
    </div>
  );
}

export default ReduxCounterComponent;
