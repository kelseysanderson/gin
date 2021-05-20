import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Options from "./pages/Options";
import Game from "./pages/Game.js";
import Stats from "./pages/Stats.js"

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path={["/", "/home"]}>
          <Home />
        </Route>
        <Route path="/options/:id">
          <Options />
        </Route>
        <Route path="/stats/:id">
          <Stats />
        </Route>
        <Route path="/game/:id">
          <Game />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;

