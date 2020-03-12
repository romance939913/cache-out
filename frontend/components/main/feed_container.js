import { connect } from 'react-redux';
import { receiveProfile, receiveRealTimePrice } from '../../actions/security_actions';
// import TransactionForm from './transaction_form';
import { receiveHolding, getHoldings, updateUser } from '../../actions/holding_actions';
import MainFeed from './feed';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    holdings: state.entities.holdings,
    price: state.entities.price,
});

const mapDispatchToProps = dispatch => ({
    getHoldings: (holding) => dispatch(getHoldings(holding)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);