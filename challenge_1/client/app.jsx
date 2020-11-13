import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import Results from './Results.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      results: [],
      pageResults: []
    };
    this.getInputValue = this.getInputValue.bind(this);

  }

  componentWillMount() {
    this.handlePageClick = this.handlePageClick(this);
  }

  getInputValue(e) {
    e.preventDefault();
    this.setState({
      inputValue: e.target.value
    });
  }

  search(term) {
    let endpoint = '/events?q=' + this.state.inputValue;
    $.get(endpoint)
    .done((data) => {
      this.setState({results: data, pageResults: data.slice(0, 9)});
    })
    .fail((error) => console.log('Failed to search'));
  }

  handlePageClick({ selected: selectedPage }) {
    // console.log('HELLO');
    // let page = selectedPage;
    // let offset = Math.ceil(page * 10) - 1;
    // this.setState({
    //   pageResults: this.state.results.slice(offset, offset + 10)
    // })
    alert(selectedPage);
  }


  render () {
    return (
    <div>
      <h1>Info Lookup</h1>
      <label htmlFor="search">Search by keyword</label>
      <input type="text" onChange={this.getInputValue}/>
      <button onClick={() => this.search(this.state.inputValue)}> Search </button>
      <Results results={this.state.pageResults}/>
      {this.state.results.length !== 0 ?
      <ReactPaginate previousLabel={'previous'} nextLabel={'next'} breakLabel={'...'} breakClassName={'break-me'} pageCount={Math.ceil(this.state.results.length / 10)} marginPagesDisplayed={2} pageRangeDisplayed={5} containerClassName={'pagination'} onPageChange={this.handlePageClick} subContainerClassName={'pages pagination'} activeClassName={'active'} disableInitialCallback={true} initialPage={1}/>
      :
      null}
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
