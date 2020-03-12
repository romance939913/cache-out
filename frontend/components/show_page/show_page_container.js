import { connect } from 'react-redux';
import { receiveProfile, receiveRealTimePrice } from '../../actions/security_actions';
import ShowPage from './show_page';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    ticker: ownProps.match.params.ticker,
    profile: state.entities.profile,
    price: state.entities.price
})

const mapDispatchToProps = dispatch => ({
    receiveProfile: (company) => dispatch(receiveProfile(company)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);