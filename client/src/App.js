import { Budgets, Home } from "./routes";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />

      <div
        style={{
          width: "65em",
          margin: "auto",
        }}
      >
        <Switch>
          <Route path="/budgets">
            <Budgets />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  // <Budget name="Build Team" />;
};

export default App;
