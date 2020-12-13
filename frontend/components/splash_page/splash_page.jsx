import React from 'react';
import Header from './header'
import ContentAndFooter from './content_and_footer';
import SplashCover from './cover';
import { connect } from 'react-redux';

function SplashPage() {
  return(
    <div>
      <Header />
      <SplashCover />
      <ContentAndFooter />
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.id]
});

export default connect(mapStateToProps, null)(SplashPage)