import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../pages/home';

const Routers = () => (
  <Switch>
    <Route exact path='/' component={Home} />
  </Switch>
)

export default Routers;
