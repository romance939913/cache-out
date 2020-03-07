import { connect } from 'react-redux';
import { signupUser } from '../../actions/session_actions';
import Signup from './signup'
import {receiveErrors} from '../../actions/session_actions'



const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    signup: (formUser) => dispatch(signupUser(formUser)),
    clearErrors: () => dispatch(receiveErrors([]))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);