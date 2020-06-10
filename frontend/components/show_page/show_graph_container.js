import { connect } from 'react-redux';
import ShowPageGraph from './show_graph';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        profile: state.entities.profile,
        graphPrices: state.entities.graphPrices,
        price: state.entities.price
    }
}

export default connect(mapStateToProps, null)(ShowPageGraph)