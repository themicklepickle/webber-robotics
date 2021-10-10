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
      <Switch>
        <Route path="/budgets">
          <Budgets />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
  // <Budget name="Build Team" />;
};

export default App;
