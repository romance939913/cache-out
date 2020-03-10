import { connect } from 'react-redux';
import { receiveProfile } from '../../actions/security_actions';
import TransactionForm from './transaction_form';
import { receiveHolding, getHolding } from '../../actions/holding_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    profile: state.entities.profile,
    holdings: state.entities.holdings,
    price: state.entities.price.price
})

const mapDispatchToProps = dispatch => ({
    receiveProfile: (company) => dispatch(receiveProfile(company)),
    receiveHolding: (holding) => dispatch(receiveHolding(holding)),
    getHolding: (holding) => dispatch(getHolding(holding)),
    //added the below withoug a thunk action yet
    updateUserInfo: (buying_power, user_id) => dispatch(updateUserInfo(buying_power, user_id)))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);