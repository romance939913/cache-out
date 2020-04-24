import { connect } from 'react-redux';
import { receiveProfile, 
            receiveRealTimePrice, 
            clearRealTimePrice, 
            receiveFinancials 
} from '../../actions/security_actions';

import ShowPage from './show_page';
import { receiveNews } from '../../actions/graph_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    ticker: ownProps.match.params.ticker,
    profile: state.entities.profile,
    price: state.entities.price,
    news: state.entities.news,
    financials: state.entities.financials
})

const mapDispatchToProps = dispatch => ({
    receiveProfile: (company) => dispatch(receiveProfile(company)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveNews: () => dispatch(receiveNews()),
    clearRealTimePrice: () => dispatch(clearRealTimePrice()),
    receiveFinancials: (ticker) => dispatch(receiveFinancials(ticker))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);