import { connect } from 'react-redux';
import { getHoldings, getUserBP } from '../../actions/holding_actions';
import MainFeed from './feed';
import { receiveNews } from '../../actions/graph_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    holdings: state.entities.holdings,
    cash: state.entities.buyingPower,
    price: state.entities.price,
    news: state.entities.news
});

const mapDispatchToProps = dispatch => ({
    getHoldings: (holding) => dispatch(getHoldings(holding)),
    getUserBP: (user) => dispatch(getUserBP(user)),
    receiveNews: () => dispatch(receiveNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);