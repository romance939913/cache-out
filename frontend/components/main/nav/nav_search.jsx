import React from 'react';
import {Link} from 'react-router-dom'

class NavSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: []
        }
        
        this.handleClearForm = this.handleClearForm.bind(this)
        this.update = this.update.bind(this)
    }
    
    handleClearForm() {
        this.setState({ query: ''});
    }

    update(field) {
        return e => {
            this.setState({ 
                [field]: e.currentTarget.value,
            })
        }
    }


    render() {
        let suggestions = []

        if(!this.props.stocks) return null;

        let companies = Object.values(this.props.stocks);
        let userInput = this.state.query.toUpperCase()
        companies.forEach((ticker, idx) => {
            if(userInput.length > 0) {
                if (ticker.symbol.includes(userInput) || (ticker.name !== null 
                && ticker.name.toUpperCase().includes(userInput))) {
                    suggestions.push(
                        <Link key={idx}
                            to={`/show/${ticker.symbol}`}
                            className="suggestion-item-link"
                            onClick={this.handleClearForm}>
                            <li key={idx} className="suggestion-item">
                                <p className="suggestion-ticker">{ticker.symbol}</p>
                                <p>{ticker.name}</p>
                            </li>
                        </Link>
                    )
                }
            }
        })

        suggestions = suggestions.slice(0, 6)

        if (this.props.stocks[userInput]) {
            suggestions[0] = 
            (<Link to={`/show/${this.props.stocks[userInput].symbol}`}
                className="suggestion-item-link"
                onClick={this.handleClearForm}>
                <li className="suggestion-item">
                    <p className="suggestion-ticker">{this.props.stocks[userInput].symbol}</p>
                    <p>{this.props.stocks[userInput].name}</p>
                      
                </li>
            </Link>)
        }

        return (
            <form className="search-form">
                <input 
                    className="search-field"
                    type="search"
                    placeholder="Search"
                    value={this.state.query}
                    onChange={this.update("query")}
                />
                <ul className="suggestion-box">
                    {suggestions}
                </ul>
            </form>
        );
    }
}

export default NavSearchForm
