import { connect } from 'react-redux';
import SplashPage from './splash_page';
import { loginUser, logoutUser } from '../../actions/session_actions';

const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id]
}); 

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    login: (formUser) => dispatch(loginUser(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage)
