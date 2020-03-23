import { connect } from 'react-redux';
import { receiveProfile } from '../../actions/security_actions';
import TransactionForm from './transaction_form';
import { receiveHolding, getHoldings, updateUser, getHolding } from '../../actions/holding_actions';

const mapStateToProps = state => ({
    profile: state.entities.profile,
    holdings: state.entities.holdings,
    price: state.entities.price,
    cash: state.entities.buyingPower,
    errors: state.errors.transaction
});

const mapDispatchToProps = dispatch => ({
    receiveProfile: (company) => dispatch(receiveProfile(company)),
    receiveHolding: (holding) => dispatch(receiveHolding(holding)),
    getHoldings: (holding) => dispatch(getHoldings(holding)),
    updateUser: (user) => dispatch(updateUser(user)),
    getHolding: (holding) => dispatch(getHolding(holding))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);