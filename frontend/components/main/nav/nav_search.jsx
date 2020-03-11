import React from 'react';
import {Link} from 'react-router-dom'

class NavSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: []
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClearForm = this.handleClearForm.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        let str = this.state.query.toUpperCase()
        // console.log(this.props.stocks[str])
    }
    
    handleClearForm() {
        this.setState({ query: ''})
    }

    update(field) {
        return e => {
            this.setState({ 
                [field]: e.currentTarget.value,
                results: []
            })
        }
    }


    render() {
        let suggestions = []
        if(!this.props.stocks) {
            return null;
        } else {
            let companies = Object.values(this.props.stocks);
            let userInput = this.state.query.toUpperCase()
            companies.forEach((ticker, idx) => {
                if(userInput.length > 0) {
                    if (ticker.symbol.startsWith(userInput) || (ticker.name !== null && ticker.name.toUpperCase().startsWith(userInput))) {
                        suggestions.push(<li key={idx} className="suggestion-item"><Link 
                                                to={`/show/${ticker.symbol}`}
                                                key={idx}
                                                className="suggestion-item-link"
                                                onClick={this.handleClearForm}>
                                                    {ticker.symbol}  {ticker.name}
                                                    </Link></li>)
                    }
                }
            })
            suggestions = suggestions.slice(0, 6)
        }
            
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input 
                    className="search-field"
                    type="search"
                    placeholder="Search"
                    value={this.state.query}
                    onChange={this.update('query')}
                />
                <ul className="suggestion-box">
                    {suggestions}
                </ul>
            </form>
        );
    }
}

export default NavSearchForm
