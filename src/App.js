import React from "react";

import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
// config react-toast
toast.configure({
  hideProgressBar: true,
  autoClose: 1500
});

const App = props => {
  return (
    <Wrapper>
      <Provider store={props.store}>
        <ConnectedRouter history={props.history}>
          <Switch>
            {props.routes.map((route, i) =>
              route.routes.map((childRoute, j) => (
                <route.layout key={childRoute.path} {...childRoute} />
              ))
            )}
          </Switch>
        </ConnectedRouter>
      </Provider>
    </Wrapper>
  );
};

export default App;
