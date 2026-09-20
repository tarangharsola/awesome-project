import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Room } from "./Room";
import { ConnectionStatus } from "./ConnectionStatus";
import { useWebSocket } from "../hooks/useWebSocket";

export const App: React.FC = () => {
  const { status, ws, sendMessage } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}`
  );

  return (
    <Router>
      <div className="app">
        <ConnectionStatus status={status} />
        <Switch>
          <Route path="/:roomId">
            <Room ws={ws} sendMessage={sendMessage} />
          </Route>
          <Route path="/">
            <Room ws={ws} sendMessage={sendMessage} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};