import React, { Component } from 'react';
import './App.css';
import Questions from './pages/Questions.js'
import Result from './pages/Result.js'
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Questions}/>
          <Route path='/result' component={Result}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
