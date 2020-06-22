import React from 'react';
import {Link} from 'react-router-dom'

class NavSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
        this.handleClearForm = this.handleClearForm.bind(this);
        this.update = this.update.bind(this);
        this.filterSuggestions = this.filterSuggestions.bind(this);
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

    filterSuggestions() {
        let suggestions = [];
        let companies = Object.values(this.props.stocks);
        let userInput = this.state.query.toUpperCase();

        if (userInput.length > 0) {
            companies.forEach((ticker, idx) => {
                if (ticker.symbol.includes(userInput) || (ticker.symbol !== null
                    && ticker.symbol.toUpperCase().includes(userInput))) {
                    suggestions.push(
                        <div key={idx}>
                            <Link
                                to={`/show/${ticker.symbol}`}
                                className="suggestion-item-link"
                                onClick={this.handleClearForm}>
                                <div className="suggestion-item">
                                    <p className="suggestion-ticker">{ticker.symbol}</p>
                                    <p>{ticker.name}</p>
                                </div>
                            </Link>
                        </div>
                    )
                }
            })
        }
        suggestions = suggestions.slice(0, 6)
        if (this.props.stocks[userInput]) {
            suggestions[0] =
                (<div key={10000}>
                    <Link to={`/show/${this.props.stocks[userInput].symbol}`}
                        className="suggestion-item-link"
                        onClick={this.handleClearForm}>
                        <li className="suggestion-item">
                            <p className="suggestion-ticker">{this.props.stocks[userInput].symbol}</p>
                            <p>{this.props.stocks[userInput].name}</p>
                        </li>
                    </Link>
                </div>)
        }
        return suggestions;
    }

    render() {
        let suggestions = this.filterSuggestions();

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
