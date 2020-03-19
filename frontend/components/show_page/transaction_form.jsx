import React from 'react';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                user_id: this.props.currentUser.id,
                ticker: this.props.ticker,
                quantity: 0,
                cost:  0,
                buySell: 'BUY',
                buying_power: this.props.buying_power
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(previousProps) {
        if (previousProps.ticker !== this.props.ticker || previousProps.holdings.quantity !== this.props.holdings.quantity) {
            this.props.getHoldings(this.state)
            this.props.buying_power
            this.setState({ ticker: this.props.ticker })
        }
    }

    componentDidMount() {
        let obj = Object.assign({}, this.state);
        this.props.getHoldings(obj);
    }

    handleClick(value) {
        this.setState({ buySell: value });
    }

    update(field) {
        return e => {
            this.setState({
                [field]: parseInt(e.currentTarget.value),
                cost: parseInt(e.currentTarget.value) * this.props.price[this.props.ticker].price,
            });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const holding = Object.assign({}, this.state);
        if (this.state.buySell === 'BUY') {
            holding['buying_power'] = this.props.currentUser.buying_power - this.state.cost;
            if(holding.buying_power >= 0) {
                this.props.receiveHolding(holding);
                this.props.updateUser(holding);
            }
            
        } else {
            holding['buying_power'] = this.props.currentUser.buying_power + this.state.cost;
            holding.quantity = holding.quantity * (-1)
            if (this.props.holdings[this.props.ticker].quantity - holding.quantity >= 0) {
                this.props.receiveHolding(holding);
                this.props.updateUser(holding);
            }
        }
    }

    render() {

        if (this.props.price[this.props.ticker] === undefined) {
            return null
        }

        let bottomMessage = '';
        if(this.state.buySell === 'BUY') {
            bottomMessage = `Buying Power: $${this.props.currentUser.buying_power.toFixed(2)}`;
        } else {
            let symbol = this.props.ticker;
            if(this.props.holdings[symbol] === undefined) {
                bottomMessage = '0 Shares Available';
            } else {
                bottomMessage = `${this.props.holdings[symbol].quantity} shares available`;
            }
        }
        
        return (
            <form className="transaction-form-wrapper" onSubmit={this.handleSubmit}>
                <div className="buy-sell-button-wrapper">
                    <p onClick={() => this.handleClick('BUY')}>Buy {`${this.props.ticker}`}</p>
                    <p onClick={() => this.handleClick('SELL')}>Sell {`${this.props.ticker}`}</p>
                </div>
                <div className="share-quantity-wrapper">
                    <label>Shares</label>
                    <input
                        type="number"
                        className="share-quantity-input"
                        value={this.state.quantity}
                        onChange={this.update('quantity')}
                        placeholder="quantity"
                    />
                </div>
                <div className="transaction-price">
                    <p>Market Price: ${`${this.props.price[this.props.ticker].price}`}</p>
                    <p>Estimated Cost: ${`${this.state.cost.toFixed(2)}`}</p>
                </div>
                <div className="transaction-submit-info">
                    <input type="submit" value={this.state.buySell} className="buy-sell-submit"/>
                    <p className="buying-power-label">
                        {bottomMessage}
                    </p>
                </div>
            </form>
        )
    }
}

export default TransactionForm;
