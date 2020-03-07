import { connect } from 'react-redux';
import { receiveStocks } from '../../../actions/security_actions';
import NavSearchForm from './nav_search';

const mapStateToProps = state => ({
    stocks: state.entities.stocks
})

const mapDispatchToProps = dispatch => ({
    receiveStocks: () => dispatch(receiveStocks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavSearchForm);