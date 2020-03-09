import React from 'react';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.currentUser,
            ticker: this.props.ticker,
            quantity: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.receiveHolding
    }

    update(field) {
        return e => {
            this.setState({ 
                user_id: this.props.currentUser,
                ticker: this.props.ticker,
                [field]: e.currentTarget.value
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

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
                <p>Market Price: </p>
                <p>estimated Cost: </p>
                <input type="submit" value="Submit Buy"/>
                <p>Buying Power: ${`${this.props.currentUser.buying_power}`}</p>
            </form>
        )
    }
}

export default TransactionForm;
