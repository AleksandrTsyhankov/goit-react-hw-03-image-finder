
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import FetchAPI from './FetchAPI/FetchAPI';


class App extends Component {
  state = {
    searchValue: '',
    showModal: false
  }

  handleSubmit = (searchValue) => {
    return this.setState({
      searchValue: searchValue
    })
  }

  render() {
    injectStyle();

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit}/>
        <FetchAPI searchValue={this.state.searchValue} />
        <ToastContainer />
      </div>
  );
  }

}

export default App;
