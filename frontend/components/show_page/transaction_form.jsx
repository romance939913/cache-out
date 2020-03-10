import React from 'react';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            holding: {
                user_id: this.props.currentUser.id,
                ticker: this.props.ticker,
                quantity: 0,
                cost:  0,
                buySell: 'BUY'
            },
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount() {
    //     this.props.getHolding({holding: {}})
    // }

    handleClick(value) {
        this.setState({
            holding: {
                user_id: this.props.currentUser.id,
                ticker: this.props.ticker,
                quantity: 0,
                cost: 0,
                buySell: value
            },
        })
    }

    update(field) {
        return e => {
            this.setState({
                holding: {
                    user_id: this.props.currentUser.id,
                    ticker: this.props.ticker,
                    [field]: parseInt(e.currentTarget.value),
                    cost: parseInt(e.currentTarget.value) * this.props.price,
                },
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const holding = Object.assign({}, this.state.holding);
        if (this.state.holding.buySell === 'BUY') {
            holding['buying_power'] = this.props.currentUser.buying_power - this.state.holding.cost;
            this.props.receiveHolding(holding);
            this.props.updateUser(holding)
        } else {
            holding['buying_power'] = this.props.currentUser.buying_power + this.state.holding.cost;
            holding['quantity'] = holding['quantity'] * (-1)
            debugger
        }
    }

    render() {
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
                        value={this.state.holding.quantity}
                        onChange={this.update('quantity')}
                        placeholder="quantity"
                    />
                </div>
                <div className="transaction-price">
                    <p>Market Price: ${`${this.props.price}`}</p>
                    <p>Estimated Cost: ${`${this.state.holding.cost}`}</p>
                </div>
                <div className="transaction-submit-info">
                    <input type="submit" value={this.state.holding.buySell} className="buy-sell-submit"/>
                    <p className="buying-power-label">
                        Buying Power: ${`${this.props.currentUser.buying_power}`}
                    </p>
                </div>
            </form>
        )
    }
}

export default TransactionForm;
