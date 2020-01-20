import React, { Component } from 'react';
import './App.css';
import Questions from './Questions.js'
import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Questions /> 
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
