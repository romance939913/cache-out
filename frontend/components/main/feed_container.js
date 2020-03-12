import { connect } from 'react-redux';
import { receiveProfile, receiveRealTimePrice } from '../../actions/security_actions';
// import TransactionForm from './transaction_form';
import { receiveHolding, getHoldings, updateUser } from '../../actions/holding_actions';
import MainFeed from './feed';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    holdings: state.entities.holdings,
    price: state.entities.price,
    graphPrices: state.entities.graphPrices,

});

const mapDispatchToProps = dispatch => ({
    receiveProfile: (company) => dispatch(receiveProfile(company)),
    getHoldings: (holding) => dispatch(getHoldings(holding)),
    updateUser: (user) => dispatch(updateUser(user)),
    receiveDay: (ticker) => dispatch(receiveDay(ticker)),
    receiveHistorical: (ticker) => dispatch(receiveHistorical(ticker)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveWeek: (ticker) => dispatch(receiveWeek(ticker)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);