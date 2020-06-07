import { connect } from 'react-redux';
import { receiveRealTimePrice, receiveIndexPrices, } from '../../actions/security_actions';
import GraphMain from './graph_main';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        graphPrices: state.entities.graphPrices,
        price: state.entities.price,
        indexes: state.entities.indexes,
        indexPrices: state.entities.indexPrices,
    }
}

const mapDispatchToProps = dispatch => ({
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveIndexPrices: (index) => dispatch(receiveIndexPrices(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphMain);