import React, { Component } from 'react';
import {
  render,
} from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from 'react-router';

import 'whatwg-fetch'

import {
  Topbar,
  Nav,
  CollapsibleNav,
} from 'amazeui-react';

import RouteLink from './components/RouteLink';
import SiteFooter from './components/SiteFooter';
import { myConfig } from './components/config.js';

class App extends Component {
  render() {
    return (
      <div className="ask-page">
        <Topbar
          className="ask-header"
          brand="快闪系统"
          brandLink="/"
          inverse
          toggleNavKey="nav"
        >
          <CollapsibleNav eventKey="nav">
            <Nav topbar>
              <RouteLink to = 'text' >文本</RouteLink>
              <RouteLink to = 'movie' >视频</RouteLink>
            </Nav>
          </CollapsibleNav>
        </Topbar>
        <main className="ask-main">
          {this.props.children}
        </main>
        <SiteFooter />
      </div>
    );
  }
}

function requireAuth(nextState, replace) {
  if (localStorage.refresh_token==undefined){
    console.log("您无权访问本页面")
      replace({
      pathname:'/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  
}

// Pages
import Text_zhaiyao from './pages/Text_zhaiyao';
import Movie_zhaiyao from './pages/Movie_zhaiyao';
import Process_movie from './pages/Process_movie'
import Index from './pages/Index';
import Login from './pages/Login'
import Logout from './pages/Logout'
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path = '/text' component = {Text_zhaiyao}/>
      <Route path = '/movie' component = {Movie_zhaiyao}/>
      <Route path = '/p_movie' component = {Process_movie}/>

      <Route path = '/logout' component = {Logout}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(routes, document.getElementById('root'));
});
