import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import ListView from './components/ListView.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // to make get request from the server
    $.ajax({
      type: 'POST',
      url:'/repos',
      contentType: 'application/json',
      data: JSON.stringify({username: term}),
      success: (data) =>{
        console.log(data);
         this.setState({repos: data});
         // $.ajax({
         //    url:'/repos',
         //    type: 'GET',
         //    data: JSON.stringify({username: "mhd-rawashdah"}),
         //    success: (data) =>{
         //      console.log(data);
         //        // setState to the state object to change the repos. with a new data
         //      this.setState({repos: data});

         //    },
         //    error: function () {
      
         //    }
         //  })

       
      }
    })



  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <ListView repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));