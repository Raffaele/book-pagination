import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { BookPage } from './components/BookPage/BookPage';
import { Container } from 'react-bootstrap';
import './App.scss';

function App() {
  return (
    <Container>
      <Router>
        <h1 className="page-title">Book list</h1>
        <Switch>
          <Route exact path="/:itemsPerPage/:page">
            <BookPage />
          </Route>
          <Route>
            <Redirect to={{pathname: "/20/1"}} />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
