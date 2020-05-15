import React, { } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import Profile from './Profile'; 
import '../App.css'


export default class Home extends React.Component {
    
    render() {
       
        return (
            <div>
               <Profile />
            </div>
        );
    }
}