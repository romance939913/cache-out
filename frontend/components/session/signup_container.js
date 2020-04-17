import { connect } from 'react-redux';
import { signupUser, loginUser, clearSessionErrors, logoutUser } from '../../actions/session_actions';
import Signup from './signup'

const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    signup: (formUser) => dispatch(signupUser(formUser)),
    signin: (formUser) => dispatch(loginUser(formUser)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);