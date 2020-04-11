import { connect } from 'react-redux';
import { receiveRealTimePrice } from '../../actions/security_actions';
import { receiveDay, receiveMultipleDays } from '../../actions/graph_actions';
import Portfolio from './portfolio';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        price: state.entities.price,
    }
}

const mapDispatchToProps = dispatch => ({
    receiveDay: (ticker) => dispatch(receiveDay(ticker)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveMultipleDays: (ticker) => dispatch(receiveMultipleDays(ticker))
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);