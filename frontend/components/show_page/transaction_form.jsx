import React from 'react';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            holding: {
                user_id: this.props.currentUser.id,
                ticker: this.props.ticker,
                quantity: ''
            },
            buying_power: 0
            // slice state to update user and holdings seperately
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
                    [field]: parseInt(e.currentTarget.value)
                },
                buying_power: {}
            })
        }
    }

    handleSubmit(e) {
        // debugger
        e.preventDefault()
        const holding = Object.assign({}, this.state.holding);
        this.props.receiveHolding(holding)
    }

    render() {
        let estimatedCost;
        if(this.state.holding.quantity === '') {
            estimatedCost = 0;
        } else {
            estimatedCost = parseInt(`${this.state.holding.quantity}`) * this.props.price;
        }
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
                <p>estimated Cost: ${estimatedCost}</p>
                <input type="submit" value="Submit Buy"/>
                <p className="buying-power-label">
                    Buying Power: ${`${this.props.currentUser.buying_power}`}
                </p>
            </form>
        )
    }
}

export default TransactionForm;
