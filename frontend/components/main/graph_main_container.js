import { connect } from 'react-redux';
import GraphMain from './graph_main';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        graphPrices: state.entities.graphPrices,
        price: state.entities.price,
        indexes: state.entities.indexes,
        indexPrices: state.entities.indexPrices,
        holdings: state.entities.holdings,
        buyingPower: state.entities.buyingPower
    }
}

export default connect(mapStateToProps, null)(GraphMain);