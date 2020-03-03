import { connect } from 'react-redux';
import { loginUser } from '../../actions/session_actions';
import Signin from './signin'


// const mapStateToProps = (state, ownProps) => ({
//     errors: state.errors,
//     formType: 'login'
// })

const mapDispatchToProps = dispatch => ({
    signin: (formUser) => dispatch(loginUser(formUser))
})

export default connect(null, mapDispatchToProps)(Signin);