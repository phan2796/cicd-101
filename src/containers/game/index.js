import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Wrapper, SquareWrapper, Square } from "./style";
import { makeSquaresData, resetGame, gameOver } from "../../reducers/game";

const Counter = props => {
  const [count, setCount] = useState(35);
  const [isRunning, setIsRunning] = useState(true);
  useEffect(() => {
    props.makeSquaresData(2);
    return () => props.resetGame();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  let { squares, number, correctIndex, isOver, score } = props;

  score = score < 0 ? 0 : score;

  let template = "";
  for (let index = 0; index < number; index++) {
    template += "auto ";
  }
  useInterval(
    () => {
      // Your custom logic here
      if (count <= 1) {
        setIsRunning(false);
        props.gameOver();
      }
      setCount(count - 1);
    },
    isRunning ? 100 : null
  );

  const changeColor = value => {
    props.makeSquaresData(number + value);
  };

  const handleSelectItem = index => {
    if (index === correctIndex) {
      changeColor(1);
      setCount(50);
    }
  };

  return (
    <Wrapper>
      <div className="left-content">
        <h1>Your score: </h1>
        <p className="score">{score}</p>
      </div>
      <div className="right-content">
        <h3>Time remaining: {count}</h3>
        <SquareWrapper template={template} isOver={isOver}>
          {squares.map((s, index) => (
            <Square
              color={squares[index].color}
              onClick={() => handleSelectItem(index)}
            />
          ))}
        </SquareWrapper>
      </div>
      {/* <input value={delay} onChange={handleDelayChange} /> */}
    </Wrapper>
  );
};

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

const mapStateToProps = state => ({
  squares: state.game.squares,
  number: state.game.number,
  correctIndex: state.game.correctIndex,
  isOver: state.game.isOver,
  score: state.game.score
});

const mapDispatchtoProps = {
  makeSquaresData,
  resetGame,
  gameOver
};
export default connect(mapStateToProps, mapDispatchtoProps)(Counter);
