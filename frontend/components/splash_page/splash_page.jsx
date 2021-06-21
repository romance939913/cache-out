import React from 'react';
import Header from './header'
import ContentAndFooter from './content_and_footer';
import SplashCover from './cover';
import TodosComponent from './todos';
import { connect } from 'react-redux';

const SplashPage = () => (
  <div>
    <Header />
    {/* <TodosComponent /> */}
    <SplashCover />
    <ContentAndFooter />
  </div>
)

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.id]
});

export default connect(mapStateToProps, null)(SplashPage)
