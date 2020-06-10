import { connect } from 'react-redux';
import { receiveProfile, 
            receiveRealTimePrice, 
            clearRealTimePrice, 
            receiveFinancials
        } from '../../actions/security_actions';
import { receiveNews, 
            receiveDay, 
            receiveWeek, 
            receiveMonth,
            receiveThreeMonths,
            receiveYear,
            receiveFiveYears, 
            clearGraphPrices 
        } from '../../actions/graph_actions';
import ShowPage from './show_page';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    ticker: ownProps.match.params.ticker,
    profile: state.entities.profile,
    price: state.entities.price,
    news: state.entities.news,
    financials: state.entities.financials,
    graphPrices: state.entities.graphPrices
})

const mapDispatchToProps = dispatch => ({
    receiveProfile: (company) => dispatch(receiveProfile(company)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveNews: () => dispatch(receiveNews()),
    clearRealTimePrice: () => dispatch(clearRealTimePrice()),
    receiveFinancials: (ticker) => dispatch(receiveFinancials(ticker)),
    receiveDay: (ticker) => dispatch(receiveDay(ticker)),
    receiveWeek: (ticker) => dispatch(receiveWeek(ticker)),
    receiveMonth: (ticker) => dispatch(receiveMonth(ticker)),
    receiveThreeMonths: (ticker) => dispatch(receiveThreeMonths(ticker)),
    receiveYear: (ticker) => dispatch(receiveYear(ticker)),
    receiveFiveYears: (ticker) => dispatch(receiveFiveYears(ticker)),
    clearGraphPrices: () => dispatch(clearGraphPrices())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);