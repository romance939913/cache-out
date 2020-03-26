import { connect } from 'react-redux';
import { getHoldings, getUserBP } from '../../actions/holding_actions';
import MainFeed from './feed';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    holdings: state.entities.holdings,
    cash: state.entities.buyingPower,
    price: state.entities.price,
});

const mapDispatchToProps = dispatch => ({
    getHoldings: (holding) => dispatch(getHoldings(holding)),
    getUserBP: (user) => dispatch(getUserBP(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);