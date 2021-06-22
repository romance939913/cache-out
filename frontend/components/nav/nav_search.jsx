import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

function NavSearch(props) {    
  const [ query, setQuery ] = useState("");

  function handleClearForm() {
    setQuery('');
  }

  function updateQuery(e) {
    setQuery(e.currentTarget.value)
  }

  function filterSuggestions() {
    let suggestions = [];
    let companies = Object.values(props.stocks);
    let userInput = query.toUpperCase();

    if (userInput.length > 0) {
      companies.forEach((ticker, idx) => {
        if (ticker.symbol.includes(userInput) || (ticker.name !== null
          && ticker.name.toUpperCase().includes(userInput))) {
          suggestions.push(
            <div key={idx}>
              <Link
                to={`/show/${ticker.symbol}`}
                className="suggestion-item-link"
                onClick={handleClearForm}>
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
    
    if (props.stocks[userInput]) {
      suggestions[0] =
        (<div key={10000}>
          <Link to={`/show/${props.stocks[userInput].symbol}`}
            className="suggestion-item-link"
            onClick={handleClearForm}>
            <li className="suggestion-item">
              <p className="suggestion-ticker">{props.stocks[userInput].symbol}</p>
              <p>{props.stocks[userInput].name}</p>
            </li>
          </Link>
        </div>)
    }
    return suggestions;
  }

  let suggestions = filterSuggestions();

  return (
    <form className="search-form">
      <input 
        className="search-field"
        type="search"
        placeholder="Search"
        value={query}
        onChange={updateQuery}
      />
      <ul className="suggestion-box">
        {suggestions}
      </ul>
    </form>
  );
}

const mapStateToProps = state => ({
  stocks: state.entities.stocks
})

export default connect(mapStateToProps, null)(NavSearch);
