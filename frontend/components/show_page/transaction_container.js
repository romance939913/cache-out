import { connect } from 'react-redux';
import { receiveProfile } from '../../actions/security_actions';
import TransactionForm from './transaction_form';
import { receiveHolding } from '../../actions/holding_actions';

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    profile: state.entities.profile,
    holdings: state.entities.holdings,
    
})

const mapDispatchToProps = dispatch => ({
    receiveProfile: (company) => dispatch(receiveProfile(company)),
    receiveHolding: (holding) => dispatch(receiveHolding(holding))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);