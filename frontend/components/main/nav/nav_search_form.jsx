import React from 'react';

class NavSearchForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateStocks() {
        $.ajax({
            url: `https://financialmodelingprep.com/api/v3/search?query=${this.state.input}&limit=10&exchange=NASDAQ`,
            method: "GET"
        }).then(res => console.log(res))
    }

    handleSubmit(e) {
        e.preventDefault();
        this.updateStocks();
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value})
        }
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input 
                    type="search"
                    placeholder="search securities"
                    onChange={this.update('input')}
                />
                <input type="submit" value="submit"/>
            </form>
        );
    }
}

export default NavSearchForm
