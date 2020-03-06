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
    }

    componentDidMount() {
        this.props.receiveStocks()
    }

    handleSubmit(e) {
        e.preventDefault();
        let str = this.state.query.toUpperCase()
        console.log(this.props.stocks[str])
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
        let suggestions = [(<li></li>)]
        if(!this.props.stocks) {
            return null;
        } else {
            let companies = Object.values(this.props.stocks);
            let userInput = this.state.query.toUpperCase()
            companies.forEach((ticker) => {
                if(userInput.length > 0) {
                    if (ticker.symbol.startsWith(userInput) || (ticker.name !== null && ticker.name.toUpperCase().startsWith(userInput))) {
                        suggestions.push(<li><Link 
                                                className="suggestion-item" 
                                                to={`/show/${ticker.symbol}`}
                                                key={ticker.symbol}>
                                                    {ticker.symbol}{ticker.name}
                                                    </Link></li>)
                    }
                }
            })
            suggestions = suggestions.slice(0, 6)
        }
            
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input 
                    type="search"
                    placeholder="search securities"
                    onChange={this.update('query')}
                />
                <input type="submit" value="submit"/>
                <ul className="suggestion-box">
                    {suggestions}
                </ul>
            </form>
        );
    }
}

export default NavSearchForm
