import { connect } from 'react-redux';
import { getHoldings, getUserBP } from '../../actions/holding_actions';
import MainFeed from './feed';
import { receiveNews, receiveSnapshots, clearGraphPrices, receiveMultipleDays } from '../../actions/graph_actions';
import { clearRealTimePrice, receiveRealTimePrice, receiveRealTimePrices } from '../../actions/security_actions';

receiveMultipleDays
const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    holdings: state.entities.holdings,
    cash: state.entities.buyingPower,
    price: state.entities.price,
    news: state.entities.news,
    snapshots: state.entities.snapshots,
    graphPrices: state.entities.graphPrices
});

const mapDispatchToProps = dispatch => ({
    getHoldings: (holding) => dispatch(getHoldings(holding)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveRealTimePrices: (ticker) => dispatch(receiveRealTimePrices(ticker)),
    receiveMultipleDays: (ticker) => dispatch(receiveMultipleDays(ticker)),
    getUserBP: (user) => dispatch(getUserBP(user)),
    receiveNews: () => dispatch(receiveNews()),
    clearRealTimePrice: () => dispatch(clearRealTimePrice()),
    receiveSnapshots: (userId) => dispatch(receiveSnapshots(userId)),
    clearGraphPrices: () => dispatch(clearGraphPrices())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);