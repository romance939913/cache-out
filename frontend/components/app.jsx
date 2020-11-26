import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SplashPageContainer from './splash_page/splash_page_container';
import SigninContainer from './session/signin_container';
import SignupContainer from './session/signup_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ShowPageContainer from './show_page/show_page_container';
import MainFeedContainer from './main/feed';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={SplashPageContainer} />
      <AuthRoute exact path="/signup" component={SignupContainer} />
      <AuthRoute exact path="/signin" component={SigninContainer} />
      <ProtectedRoute exact path="/feed" component={MainFeedContainer} />
      <ProtectedRoute exact path="/show/:ticker" component={ShowPageContainer} />
    </Switch>
  </div>
);

export default App;