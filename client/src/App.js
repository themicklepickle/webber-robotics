import "./styles/App.css";

import { Budgets, Home } from "./routes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/budgets">Budgets</Link>
          </li>
        </ul>
      </div>

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
