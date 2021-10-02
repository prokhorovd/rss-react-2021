import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <p>{counter}</p>
      <button
        type="button"
        onClick={() => setCounter((prevCounter) => prevCounter + 1)}
      >
        Increase
      </button>
    </div>
  );
}

export default Counter;
