import { connect } from 'react-redux';
import { receiveDay, receiveHistorical } from '../../actions/security_actions';
import ShowPageGraph from './graph';


const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    profile: state.entities.profile,
    dayPrices: state.entities.showDayPrices
})

const mapDispatchToProps = dispatch => ({
    receiveDay: (ticker) => dispatch(receiveDay(ticker)),
    receiveHistorical: (ticker) => dispatch(receiveHistorical(ticker))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPageGraph)