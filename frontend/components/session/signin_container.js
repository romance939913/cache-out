import { connect } from 'react-redux';
import { loginUser, receiveErrors } from '../../actions/session_actions';
import Signin from './signin'


const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    signin: (formUser) => dispatch(loginUser(formUser)),
    clearErrors: () => dispatch(receiveErrors([]))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);