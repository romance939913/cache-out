import { receiveProfile } from '../../actions/security_actions';
import TransactionForm from './transaction_form';
import { receiveHolding, getHolding, updateUser } from '../../actions/holding_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    profile: state.entities.profile,
    holdings: state.entities.holdings,
    price: state.entities.price
})

const mapDispatchToProps = dispatch => ({
    receiveProfile: (company) => dispatch(receiveProfile(company)),
    receiveHolding: (holding) => dispatch(receiveHolding(holding)),
    getHolding: (holding) => dispatch(getHolding(holding)),
    updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);