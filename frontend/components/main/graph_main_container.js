import { connect } from 'react-redux';
import { receiveRealTimePrice, receiveIndexes, receiveIndexPrices, } from '../../actions/security_actions';
import { receiveHistorical, receiveDay, receiveWeek } from '../../actions/graph_actions';
import GraphMain from './graph_main';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        graphPrices: state.entities.graphPrices,
        price: state.entities.price,
        indexes: state.entities.indexes,
        indexPrices: state.entities.indexPrices
    }
}

const mapDispatchToProps = dispatch => ({
    receiveDay: (ticker) => dispatch(receiveDay(ticker)),
    receiveHistorical: (ticker) => dispatch(receiveHistorical(ticker)),
    receiveWeek: (ticker) => dispatch(receiveWeek(ticker)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveIndexes: () => dispatch(receiveIndexes()),
    receiveIndexPrices: (index) => dispatch(receiveIndexPrices(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphMain);