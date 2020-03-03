import { connect } from 'react-redux';
import { signupUser } from '../../actions/session_actions';
import Signup from './signup'


const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    signup: (formUser) => dispatch(signupUser(formUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);