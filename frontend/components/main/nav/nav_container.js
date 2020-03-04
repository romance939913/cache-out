import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/session_actions';
import MainNav from './nav';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);