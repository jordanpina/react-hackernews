import React, { Component } from 'react';
import './App.css';
import Search from './Search'
import Table from './Table'


const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: ''
    };
    this.isSearched = this.isSearched.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  isSearched(searchTerm) {
    return item => !searchTerm ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }

  onDismiss(id) {

    let items = this.state.list.filter(item => item.objectID !== id)
    this.setState({ list: items })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }


  render() {
    const { searchTerm, list } = this.state;
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

        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          isSearched={this.isSearched}
        />
      </div>
    );
  }
}


export default App;
