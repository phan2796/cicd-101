import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import game from "./game";

export const createAppReducer = (history, asyncReducers) =>
  combineReducers({
    router: connectRouter(history),
    game,
    ...asyncReducers
  });

export const createRootReducer = (history, asyncReducers) => {
  let appReducer = createAppReducer(history, asyncReducers);

  const rootReducer = (state, action) => {
    return appReducer(state, action);
  };

  return rootReducer;
};

export default createRootReducer;
