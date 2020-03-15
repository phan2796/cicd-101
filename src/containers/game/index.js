import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Wrapper, SquareWrapper, Square } from "./style";
import { colors, addHexColor } from "./utils";

function Counter() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(2);
  const [delay, setDelay] = useState(10);
  const [color, setColor] = useState(10);
  const [isRunning, setIsRunning] = useState(true);
  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
    return () => {};
  }, []);

  let squares = Array(number * number).fill({
    color
  });
  let template = "";
  for (let index = 0; index < number; index++) {
    template += "auto ";
  }
  let basic = 100 / number;
  console.log(basic);
  // useInterval(() => {
  //   // Your custom logic here
  //   if(count <= 1){
  //     setIsRunning(false)
  //   }
  //   setCount(count - 1);

  // }, isRunning ? delay : null);

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  function handleIsRunningChange(e) {
    setIsRunning(e.target.checked);
  }

  const changeColor = () => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <Wrapper>
      <h1>{count}</h1>
      <input
        type="checkbox"
        checked={isRunning}
        onChange={handleIsRunningChange}
      />{" "}
      Running
      <br />
      <button onClick={() => setNumber(number + 1)}>Increase</button>
      <button onClick={() => setNumber(number - 1)}>Decrease</button>
      <button onClick={() => changeColor()}>Change</button>
      <SquareWrapper template={template}>
        {squares.map((s, index) => (
          <Square basis={basic} color={squares[index].color}>
            {index}
          </Square>
        ))}
      </SquareWrapper>
      {/* <input value={delay} onChange={handleDelayChange} /> */}
    </Wrapper>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default connect(null, null)(Counter);
