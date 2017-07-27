import React, { Component } from 'react';
import './App.css';
import Search from './Search'
import Table from './Table'

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  //Call function to grab API data
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  //Grab API data
  fetchSearchTopstories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
      .catch(e => e);
  }
 
  //Set state of result property to fetched data
  setSearchTopstories(result) {
    this.setState({ result });
  }
  
  //Helper method for filter function to keep search results which have search term
  isSearched(searchTerm) {
    return item => !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }    
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }


  render() {
    const { searchTerm, result } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
        </Search>
        </div>

        { result
? <Table
list={result.hits}
pattern={searchTerm}
onDismiss={this.onDismiss}
isSearched={this.isSearched}
/>
: null
}
      </div>
    );
  }
}


export default App;
