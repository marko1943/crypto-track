/*
 * @Author: Marko Stojiljković 
 * @Date: 2018-09-16 18:17:16 
 * @Last Modified by:   Marko Stojiljković 
 * @Last Modified time: 2018-09-16 18:17:16 
 */

import React, { Component } from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import HomePage from './pages/HomePage/HomePage';
import DetailsPage from './pages/DetailsPage/DetailsPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/details/:id" component={DetailsPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
