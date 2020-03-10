import React from 'react';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            holding: {
                user_id: this.props.currentUser.id,
                ticker: this.props.ticker,
                quantity: '',
                cost:  0
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentDidMount() {
    //     this.props.getHolding({holding: {}})
    // }

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
        holding['buying_power'] = this.props.currentUser.buying_power - this.state.holding.cost;
        debugger
        this.props.receiveHolding(holding);
        this.props.updateUser(holding)
    }

    render() {
        return (
            <form className="transaction-form-wrapper" onSubmit={this.handleSubmit}>
                <p>Buy {`${this.props.ticker}`}</p>
                <p>sell {this.props.ticker}</p>
                <input
                    type="number"
                    onChange={this.update('quantity')}
                    placeholder="Shares quantity"
                />
                <p>Market Price: ${`${this.props.price}`}</p>
                <p>estimated Cost: ${`${this.state.holding.cost}`}</p>
                <input type="submit" value="Submit Buy"/>
                <p className="buying-power-label">
                    Buying Power: ${`${this.props.currentUser.buying_power}`}
                </p>
            </form>
        )
    }
}

export default TransactionForm;
