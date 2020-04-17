import { connect } from 'react-redux';
import { loginUser, clearSessionErrors, logoutUser } from '../../actions/session_actions';
import Signin from './signin'

const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    signin: (formUser) => dispatch(loginUser(formUser)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);