import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Options from "./pages/Options";

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
      </Switch>
    </div>
  </Router>
  );
}

export default App;

