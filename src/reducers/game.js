import actions from "../modules/actions";
import api from "../modules/api";
import { toast } from "react-toastify";

const MAX_LENGTH = 5;
const MIN_RANGE = 10;
export const TIME_LIMIT = 25;
const colors = [
  "55efc4",
  "81ecec",
  "a4b0be",
  "82ccdd",
  "00b894",
  "00cec9",
  "7bed9f",
  "2bcbba",
  "ffeaa7",
  "fab1a0",
  "ff7675",
  "fd79a8",
  "34e7e4",
  "b8e994",
  "dfe6e9",
  "f8c291",
  "b2bec3",
  "636e72"
];

//  random hex string generator
const getHexColor = (c1, range) => {
  var hexStr = (parseInt(c1, 16) - range).toString(16);
  while (hexStr.length < 6) {
    hexStr = "0" + hexStr;
  } // Zero pad.
  return hexStr;
};

const { UPDATE_GAME_DATA } = actions;

export const updateGameData = payload => ({
  type: UPDATE_GAME_DATA,
  payload
});

// thunks
export const makeSquaresData = number => {
  return async (dispatch, getState) => {
    let { score } = getState().game;
    let squares = [];
    if (number > MAX_LENGTH) {
      number = MAX_LENGTH;
    }

    let color = colors[Math.floor(Math.random() * colors.length)];
    for (let index = 0; index < number * number; index++) {
      squares.push({
        color
      });
    }

    let randomIndex = Math.floor(Math.random() * number * number);

    let range = 50 - score * score;
    if (range < MIN_RANGE) {
      range = MIN_RANGE;
    }
    squares[randomIndex].color = getHexColor(color, MIN_RANGE);

    dispatch(
      updateGameData({
        squares: [...squares],
        number,
        correctIndex: randomIndex,
        score: score + 1
      })
    );
  };
};

export const getScores = () => {
  return async dispatch => {
    try {
      let res = await api.getScores();
      let scores = res.data.scores;
      dispatch(
        updateGameData({
          scores
        })
      );
    } catch (error) {}
  };
};

export const submitScore = () => {
  return async (dispatch, getState) => {
    try {
      let data = {
        name: getState().game.name,
        score: getState().game.score
      };

      await api.submitScore(data);

      let res = await api.getScores();
      let scores = res.data.scores;

      dispatch(
        updateGameData({
          scores,
          submited: true
        })
      );
      toast.success("Your score have been saved!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    } catch (error) {
      toast.error("Error!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    }
  };
};

export const handleStart = () => {
  return async dispatch => {
    dispatch(
      updateGameData({
        isOver: false
      })
    );
  };
};

export const gameOver = () => {
  return async dispatch => {
    try {
      dispatch(
        updateGameData({
          isOver: true
        })
      );
    } catch (error) {}
  };
};

export const playAgain = () => {
  return async dispatch => {
    try {
      dispatch(
        updateGameData({
          isOver: false,
          score: -1,
          submited: false
        })
      );
    } catch (error) {}
  };
};

export const resetGame = () => {
  return async dispatch => {
    try {
      dispatch(updateGameData(initialState));
    } catch (error) {}
  };
};

// action handlers
const ACTION_HANDLERS = {
  [UPDATE_GAME_DATA]: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  }
};

const initialState = {
  squares: [],
  color: "",
  number: 2,
  score: -1,
  correctIndex: 0,
  isOver: true,
  scores: [],
  submited: false
};

// reducers
export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
