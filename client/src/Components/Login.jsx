import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import {Nav,Navbar} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';  
import history from './History'; 
import '../App.css'; 


const style = {
    height: 25,
    margin: 0,
    width: 150, 
   };
  
export default class Login extends React.Component {

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
            url: 'http://localhost:9000/remove', 
        })
        .then(() => {
            //console.log('Data has been removed'); 
        })
        .catch((error) => {
            //console.log('Error:', error); 
        });
        //authenticate user login
        axios({
            url: 'http://localhost:9000/authentication/login',
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
                    </Nav>
                    
                    <Nav>
                        <form onSubmit= {this.handleSubmit}>
                            <div className="form-group text-center">
                                <input
                                    type="text" 
                                    name="email" 
                                    className="form-control-sm" 
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange} 
                                />
                                <input 
                                    type="password"
                                    name="password" 
                                    className="form-control-sm" 
                                    placeholder="Password"
                                    onChange= {this.handleChange} 
                                />
                                <button className="btn btn-secondary" style={style} type="Submit" onClick={(event) => this.handleSubmit(event)}>Submit!</button>
                            </div>
                        </form>
                    </Nav>
                </Navbar>
                <form className="loginError">
                    <h5><p>{this.state.errorMessage}</p></h5>
                </form>
                <form className="wallpaper">
                    <div>
                    
                    </div>
                </form>

            </div>
        );
    }
}