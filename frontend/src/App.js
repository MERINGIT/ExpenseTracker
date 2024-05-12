// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Expense from './components/Expense';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/expense" component={Expense} />
      </Switch>
    </Router>
  );
}

export default App;
