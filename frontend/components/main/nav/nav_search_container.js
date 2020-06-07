import { connect } from 'react-redux';
import NavSearchForm from './nav_search';

const mapStateToProps = state => ({
    stocks: state.entities.stocks
})

export default connect(mapStateToProps, null)(NavSearchForm);