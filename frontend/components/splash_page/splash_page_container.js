import { connect } from 'react-redux';
import SplashPage from './splash_page';
import { loginUser } from '../../actions/session_actions';

const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id]
}); 

const mapDispatchToProps = dispatch => ({
    login: (formUser) => dispatch(loginUser(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage)
