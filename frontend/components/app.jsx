import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SplashPage from './splash_page/splash_page';
import Signin from './session/signin';
import Signup from './session/signup';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ShowPageContainer from './show_page/show_page_container';
import MainFeedContainer from './main/feed';
import { connect } from 'react-redux';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path="/signup" component={Signup} />
      <AuthRoute exact path="/signin" component={Signin} />
      <ProtectedRoute exact path="/feed" component={MainFeedContainer} />
      <ProtectedRoute exact path="/show/:ticker" component={ShowPageContainer} />
    </Switch>
  </div>
);

const mapStateToProps = state => ({
  loggedin: state.session.id
})

export default connect(mapStateToProps, null)(App);