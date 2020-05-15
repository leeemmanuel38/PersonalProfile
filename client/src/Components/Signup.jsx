import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import {Nav,Navbar} from 'react-bootstrap';
import {Redirect} from 'react-router-dom'; 
import {} from 'react-router-dom'; 
 
import history from './History'; 
import '../App.css'; 


const style = {
    height: 25,
    margin: 0,
    width: 150, 
   };
  
export default class Login extends Component {

    constructor(props){
        super(props);
        this.state={
          email:'',
          password:'',
        }
      };

    handleSubmit = (event) => {
        event.preventDefault(); 
        
        const {email, password} = this.state;  
        // endpoint to remove blogpost data from database 
        axios({
        url: 'http://ec2-34-203-244-60.compute-1.amazonaws.com:9000/remove', 
        })
        .then(() => {
            //console.log('Data has been removed'); 
        })
        .catch((error) => {
            //console.log('Error:', error); 
        });

        // endpoint to authenticate user for sign up
        axios({
            url: 'http://ec2-34-203-244-60.compute-1.amazonaws.com:9000/signup',
            method: 'POST',
            data: {email, password},
        })
        .then (response => {
            const isAuthenticated = true;
            window.localStorage.setItem('isAuthenticated', isAuthenticated); 
    
            this.props.history.push('./'); 
           
        })
        .catch ((error) => {
            this.setState({
                errorMessage: error.response.data.message
            }) 
        })
    };

    handleChange = (event) => {
        const {name, value} = event.target; 
        this.setState({
            [name]: value
        });  
    }; 

    render() {
        const isAuthenticated = window.localStorage.getItem('isAuthenticated'); 

        if(isAuthenticated){
            return (
                <div>
                    <Redirect to='/' />
                </div>
            )
        }
        return (
            <div>
                <Navbar bg= "danger" variant="dark">
                    <Nav className="mr-auto" >
                        <Nav.Link onClick={() => history.push('/')}>Back to profile</Nav.Link>
                        <Nav.Link onClick={() => history.push('/login')}>Sign in</Nav.Link>
                    </Nav>
                    
                    <Nav>
                        <form onSubmit= {this.handleSubmit}>
                            <div class="form-group text-center">
                                <input className="form-control-sm" 
                                    type="text"
                                    name="email" 
                                    placeholder="Enter your Email"
                                    onChange= {this.handleChange} 
                                />
                                <input  className="form-control-sm"
                                    type="password" 
                                    name="password" 
                                    onChange= {this.handleChange} 
                                    placeholder="Create a Password"
                                />
                                <button class="btn btn-secondary" style={style} type="Submit" onClick={(event) => this.handleSubmit(event)}>Create Account</button>
                            </div>
                        </form>
                    </Nav>
                </Navbar>
                <form className="registerError">
                    <h5>
                        <p>{this.state.errorMessage}</p>
                    </h5>
                </form>

            </div>
        );
    }
}