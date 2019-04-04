
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// 首页
import Home from './home';

const HomeRouter = () => (
  <div className="g-app-box">
    <Home />
  </div>
)

export default HomeRouter;
