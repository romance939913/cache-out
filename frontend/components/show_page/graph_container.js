import { connect } from 'react-redux';
import { receiveRealTimePrice } from '../../actions/security_actions';
import ShowPageGraph from './graph';
import { receiveHistorical, receiveDay, receiveWeek } from '../../actions/graph_actions';



const mapStateToProps = (state) => {
    // debugger
    return {
        currentUser: state.entities.users[state.session.id],
        profile: state.entities.profile,
        graphPrices: state.entities.graphPrices,
        price: state.entities.price
    }
}

const mapDispatchToProps = dispatch => ({
    receiveDay: (ticker) => dispatch(receiveDay(ticker)),
    receiveHistorical: (ticker) => dispatch(receiveHistorical(ticker)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveWeek: (ticker) => dispatch(receiveWeek(ticker))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPageGraph)