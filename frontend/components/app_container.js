import { connect } from 'react-redux';
import App from './app';

const mapStateToProps = state => ({
    loggedin: state.session.id
})

export default connect(mapStateToProps, null)(App);