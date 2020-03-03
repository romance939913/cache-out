import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SplashPageContainer from './splash_page/splash_page_container';
import Signin from './session/signin';


const App = () => (
  <div>
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/" component={SplashPageContainer}/>
    </Switch>
  </div>
);

export default App;