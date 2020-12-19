import "./mockjs/mymock";
//import Mock from 'mockjs';
import React, { Component } from 'react';
import './css/style.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
  componentDidMount(){
    axios.get('/get').then((data)=>{
      console.log(data);
    })
  }
}

export default App;