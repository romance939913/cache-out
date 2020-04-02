import { connect } from 'react-redux';
import { getHoldings, getUserBP } from '../../actions/holding_actions';
import MainFeed from './feed';
import { receiveNews } from '../../actions/graph_actions';
import { clearRealTimePrice, receiveRealTimePrice } from '../../actions/security_actions';
receiveRealTimePrice
const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    holdings: state.entities.holdings,
    cash: state.entities.buyingPower,
    price: state.entities.price,
    news: state.entities.news
});

const mapDispatchToProps = dispatch => ({
    getHoldings: (holding) => dispatch(getHoldings(holding)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    getUserBP: (user) => dispatch(getUserBP(user)),
    receiveNews: () => dispatch(receiveNews()),
    clearRealTimePrice: () => dispatch(clearRealTimePrice())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);