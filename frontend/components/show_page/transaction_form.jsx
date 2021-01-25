import React from 'react';
import numeral from 'numeral'
import { connect } from 'react-redux';
import { receiveProfile } from '../../actions/security_actions';
import { getTransactions } from '../../actions/transaction_actions'
import {
  receiveHolding,
  getHoldings,
  updateUser,
  getHolding,
  getUserBP,
  clearErrors,
  receiveSuccess,
} from '../../actions/holding_actions';

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      cost:  0,
      buySell: 'BUY',
      buying_power: this.props.buying_power
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.ticker !== this.props.ticker) {
      let holding = {
        user_id: this.props.currentUser.id,
        ticker: this.props.ticker
      }
      this.props.clearErrors()
      this.props.getHolding(holding);
      this.props.getUserBP(this.props.currentUser.id);
      this.state.quantity = '';
      this.state.cost = 0;
      this.state.buySell = 'BUY'
    }
  }

  componentDidMount() {
    let creds = {
      user_id: this.props.currentUser.id,
      ticker: this.props.ticker
    }
    this.props.getHolding(creds)
    this.props.getTransactions(creds);
    this.props.getUserBP(this.props.currentUser.id)
  }

  handleClick(value) {
    this.setState({ buySell: value });
    this.changeUnderline(value);
    this.props.clearErrors();
  }

  changeUnderline(value) {
    let types = Array.prototype.slice.call(document.getElementsByClassName("transaction-type"));
    types.forEach((type, idx) => {
      let typeClassList = Array.prototype.slice.call(type.classList);
      type.classList.remove("selected")
      if(typeClassList.includes(value)) {
        type.classList.add("selected")
      }
    })
  }

  update(field) {
    return e => {
      let cost;
      if (e.currentTarget.value === '') {
        cost = 0;
      } else {
        cost = parseInt(e.currentTarget.value) * this.props.price[this.props.ticker];
      }

      this.setState({
        [field]: parseInt(e.currentTarget.value),
        cost
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const holding = {
      user_id: this.props.currentUser.id,
      ticker: this.props.ticker,
      quantity: this.state.quantity,
      cost: this.state.cost
    }
    if (holding.quantity === '') return;
    if (this.state.buySell === 'BUY') {
      holding['buying_power'] = this.props.cash - this.state.cost;
      this.props.updateUser(holding)
        .then(res => {
          this.props.receiveHolding(holding)
            .then((res) => {
              if (res.holding !== undefined) {
                this.props.receiveSuccess()
              }
            })
        })
      setTimeout(() => { this.props.clearErrors() }, 3000);
    } else {
      holding['buying_power'] = this.props.cash + this.state.cost;
      holding.quantity = holding.quantity * (-1);
      this.props.updateUser(holding)
        .then(res => {
          this.props.receiveHolding(holding)
            .then((res) => {
              if (res.holding !== undefined) {
                this.props.receiveSuccess()
              }
            })
        })
      setTimeout(() => { this.props.clearErrors() }, 3000);
    }
  }

  render() {
    if (this.props.cash.length === 0) return null;
    if (this.props.price[this.props.ticker] === undefined) return null;

    let bottomMessage = '';
    if(this.state.buySell === 'BUY') { 
      bottomMessage = `Buying Power: ${numeral(this.props.cash).format('$0,0.00')}`;
    } else {
      if(this.props.holdings[this.props.ticker] === undefined) {
        bottomMessage = '0 Shares Available';
      } else {
        bottomMessage = `${numeral(this.props.holdings[this.props.ticker].quantity).format('0,0')} shares available`;
      }
    }

    let color;
    if (this.props.errors.length !== 0) {
      if (this.props.errors[0] === 'not enough cash' || 
        this.props.errors[0] === 'not enough shares') {
        color = 'red'
      } else {
        color = 'green'
      }
    }


    return (
      <form className="transaction-form-wrapper" onSubmit={this.handleSubmit}>
        <div>
          <div className="buy-sell-button-wrapper">
            <h2 onClick={() => this.handleClick('BUY')} className="transaction-type BUY selected">Buy {`${this.props.ticker}`}</h2>
            <h2 onClick={() => this.handleClick('SELL')} className="transaction-type SELL">Sell {`${this.props.ticker}`}</h2>
          </div>
          <div className="share-quantity-wrapper">
            <label>Shares:</label>
            <input
              type="number"
              className="share-quantity-input"
              value={this.state.quantity}
              onChange={this.update('quantity')}
              placeholder={0}
              min="0"
            />
          </div>
          <div>
            <div className="transaction-price">
              <p>Market Price: </p>
              <p>{numeral(this.props.price[this.props.ticker]).format('$0,0.00')}</p>
            </div>
            <div className="transaction-price">
              <p>Estimated Cost:</p>
              <p>{numeral(this.state.cost).format('$0,0.00')}</p>
            </div>
          </div>
        </div>
        <div className="transaction-submit-info">
          <p className={`transaction-errors-arr ${color}`}>
            {this.props.errors}
          </p>
          <input type="submit" value={this.state.buySell} className="buy-sell-submit"/>
          <p className="buying-power-label">
            {bottomMessage}
          </p>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.entities.profile,
  holdings: state.entities.holdings,
  price: state.entities.price,
  cash: state.entities.buyingPower,
  errors: state.errors.transaction
});

const mapDispatchToProps = dispatch => ({
  receiveProfile: (company) => dispatch(receiveProfile(company)),
  receiveHolding: (holding) => dispatch(receiveHolding(holding)),
  getHoldings: (holding) => dispatch(getHoldings(holding)),
  updateUser: (user) => dispatch(updateUser(user)),
  getHolding: (holding) => dispatch(getHolding(holding)),
  getUserBP: (user) => dispatch(getUserBP(user)),
  clearErrors: () => dispatch(clearErrors()),
  receiveSuccess: () => dispatch(receiveSuccess()),
  getTransactions: (creds) => dispatch(getTransactions(creds))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
