import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Wrapper, SquareWrapper, Square } from "./style";
import {
  makeSquaresData,
  resetGame,
  gameOver,
  handleStart,
  playAgain,
  TIME_LIMIT
} from "../../reducers/game";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Counter = props => {
  const [count, setCount] = useState(TIME_LIMIT);
  const [isRunning, setIsRunning] = useState(false);
  const [modal, setModal] = useState(true);
  const [modalReplay, setModalReplay] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleReplay = () => setModalReplay(!modalReplay);
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
        setModalReplay(true);
        props.gameOver();
      }
      setCount(count - 1);
    },
    isRunning ? 100 : null
  );

  const changeColor = value => {
    props.makeSquaresData(number + value);
  };

  const handleStart = () => {
    toggle();
    setIsRunning(true);
    props.handleStart();
  };

  const handlePlayAgain = () => {
    toggleReplay();
    props.playAgain();
    props.makeSquaresData(2);
    setCount(TIME_LIMIT);
    setIsRunning(true);
  };

  const handleSelectItem = index => {
    if (index === correctIndex) {
      setCount(TIME_LIMIT);
      changeColor(1);
    }
  };

  return (
    <>
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
        <Modal isOpen={modal} centered keyboard={false} backdrop={"static"}>
          <ModalHeader>How good are your eyes?</ModalHeader>
          <ModalBody>Please select a different color square on time!</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => handleStart()}>
              Let start!!!
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={modalReplay}
          centered
          keyboard={false}
          backdrop={"static"}
        >
          <ModalHeader>Game over</ModalHeader>
          <ModalBody>Your score: {score}</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => handlePlayAgain()}>
              Play Again!!!
            </Button>
          </ModalFooter>
        </Modal>
      </Wrapper>
    </>
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
  gameOver,
  handleStart,
  playAgain
};
export default connect(mapStateToProps, mapDispatchtoProps)(Counter);
