import { connect } from 'react-redux';
import MainFeed from './feed';
import { logoutUser } from '../../actions/session_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed)