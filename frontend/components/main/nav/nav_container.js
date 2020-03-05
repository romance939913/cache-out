import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/session_actions';
import MainNav from './nav';
import { receiveStocks, receiveIndexes } from '../../../actions/security_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    indexes: state.entities.indexes
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser()),
    receiveStocks: () => dispatch(receiveStocks()),
    receiveIndexes: () => dispatch(receiveIndexes())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);