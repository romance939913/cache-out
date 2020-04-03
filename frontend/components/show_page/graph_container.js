import { connect } from 'react-redux';
import { receiveRealTimePrice } from '../../actions/security_actions';
import ShowPageGraph from './graph';
import { receiveHistorical, receiveDay, receiveWeek, clearGraphPrices } from '../../actions/graph_actions';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        profile: state.entities.profile,
        graphPrices: state.entities.graphPrices,
    }
}

const mapDispatchToProps = dispatch => ({
    receiveDay: (ticker) => dispatch(receiveDay(ticker)),
    receiveHistorical: (ticker) => dispatch(receiveHistorical(ticker)),
    receiveWeek: (ticker) => dispatch(receiveWeek(ticker)),
    clearGraphPrices: () => dispatch(clearGraphPrices())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPageGraph)