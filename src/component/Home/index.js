import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link,NavLink} from 'react-router-dom'
import RealTimePage from './RealTime/index';
import HistoryPage from './History/index';
import WelcomePage from './Welcome/index';
import {HBtn,RBtn,WBtn,LogoBtn} from './SideButton/SideBtn';

class index extends Component {
  constructor(props){
    super(props);
    this.state={
      id:props.id
    }
  }

  render() {
    return (
      <div className="home">
        <Router>
        <div className="sider">
          <LogoBtn/>
          <NavLink to="/rtp" activeClassName="sider-btn-clicked"><RBtn/></NavLink>
          <NavLink to="/htp" activeClassName="sider-btn-clicked"><HBtn/></NavLink>
          <NavLink to="/" activeClassName="sider-btn-clicked"><WBtn/></NavLink>
        </div>
        <div className="main">
          <Route path="/rtp" component={RealTimePage}></Route>
          <Route path="/htp" component={HistoryPage}></Route>
          <Route exact path="/" component={WelcomePage}></Route>
        </div>  
        </Router>
      </div>
    );
  }
}

export default index;