import { connect } from 'react-redux';
import { receiveRealTimePrice } from '../../actions/security_actions';
import { receiveHistorical, receiveDay, receiveWeek } from '../../actions/graph_actions';
import GraphMain from './graph_main';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        graphPrices: state.entities.graphPrices,
        holdings: state.entities.holdings,
        price: state.entities.price,
    }
}

const mapDispatchToProps = dispatch => ({
    receiveDay: (ticker) => dispatch(receiveDay(ticker)),
    receiveHistorical: (ticker) => dispatch(receiveHistorical(ticker)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveWeek: (ticker) => dispatch(receiveWeek(ticker))
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphMain)