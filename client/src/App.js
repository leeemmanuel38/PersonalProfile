import React, { } from 'react'; 
import {Router, Route, Switch } from 'react-router-dom'; 

import History from './Components/History'; 
import Home from './Components/Home'; 
import Profile from './Components/Profile';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Upload from './Components/UploadPhoto';
import Fetch from './Components/FetchApi';


export default class App extends React.Component {

    render() {

        return (
          <Router history={History}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/profile" component={Profile}/> 
              <Route path="/login" component={Login}/>
              <Route path="/upload" component={Upload}/>
              <Route path="/fetch" component={Fetch}/>

            </Switch>
          </Router>
            
        );
    }
}