import { connect } from 'react-redux';
import SplashPage from './splash_page';

const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id]
});


export default connect(mapStateToProps, null)(SplashPage)
