import React, { Component } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,Navbar} from 'react-bootstrap';
import axios from 'axios'; 
import history from './History';
import Upload from './UploadPhoto'; 
import Covid from './FetchApi'; 
import '../App.css';


const style = {
    height: 25,
    margin: 0,
    width: 150, 
   };

export default class Profile extends Component {
    
    state = {
        title: '', 
        body: '',  
        posts: [],
        url: '' 
    };

  
    handleLogoutClick = (event) => {
        event.preventDefault(); 
        localStorage.removeItem("isAuthenticated"); 
        history.push('./');
    };

    handleChange = ({ target }) => {
        const { name, value } = target; 
    
        this.setState({
            [name]: value
        });
    };

    submit = (event) => {
        event.preventDefault();
        
        const payload = {
            title: this.state.title, 
            body: this.state.body,
        };
         
        // send data to back end server endpoint 
        axios({
            url: 'http://localhost:9000/api/save', 
            method: 'POST', 
            data: payload, 
        })
        .then(() => {
            console.log('Data has been sent to the server'); 
            this.resetInputBox(); 
            this.getData(); 
        })
        .catch(() => {
            console.log('Internal server error');
        });; 

    };

     // clear text box after submission 
     resetInputBox = () => {
        this.setState({
            title: '', 
            body: '', 
            posts: [], 
        }); 
    };

    componentDidMount = () => {
        this.getData(); 
    };

    getData = () => {
        axios.get('http://localhost:9000/api')
            .then((response) => {
                const data = response.data;
                this.setState({posts: data});
              
                console.log('Data received');
                 
            })
            .catch(() => {
                alert('Error has occurred trying to return data'); 
        });
    };

    displayData = (posts) => {
        if (!posts.length) return null; 
       
        return posts.map((post, index) => (
            <div key={index}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        )); 
    };

    render() {
        const isAuthenticated = window.localStorage.getItem('isAuthenticated'); 
        const url = window.localStorage.getItem('URL'); 

        if(isAuthenticated){
            return (
                <div >
                    <Navbar bg= "danger" variant="dark">
                        <Nav className="mr-auto" >
                            <Nav.Link onClick={() => history.push('/')}>Registered as Admin</Nav.Link>
                            
                        </Nav>
                        <Nav>
                            <form className="text-center" onClick={(event) => {this.handleLogoutClick(event)}}>
                                <button className="btn btn-primary" style={style} type="Submit" >Save and Logout</button>
                            </form>
                        </Nav>
                    </Navbar>
                   
                    <div class="text-center">
                    <h1><i>(edit) Emmanuel Lee's Profile Admin</i></h1>
                    </div>
                    <form className="userPicture">
                        
                    </form>
                    <Upload />
                    
                    <form onSubmit={this.submit} className="editableEnvironment">
                       <div className="form-input">
                        <input 
                            type="text"
                            name="title"
                            placeholder="Name of Section..."
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-input">
                        <textarea
                            placeholder="Description..."
                            name="body"
                            cols="80"
                            rows="15"
                            value={this.state.body}
                            onChange={this.handleChange}
                         ></textarea>   
                    </div>
                    <button>submit</button>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <Navbar bg= "danger" variant="dark">
                    <Nav className="mr-auto" > 
                        <Nav.Link onClick={() => history.push('/')}>Profile</Nav.Link>
                        <Nav.Link onClick={() => history.push('/login')}>Sign in</Nav.Link>
                    </Nav>
                </Navbar>
                
                <form className="wallpaper">
                    <div className="text-center">
                        <h1><i>Emmanuel Lee's Profile</i></h1>
                    </div>
                
                    <form className="userPicture">
                        <img 
                            src={url}
                            height="287"
                            width="346"
                            alt="Profile"
                        />
                    </form>
                    <div className="editableEnvironment">
                        {this.displayData(this.state.posts)}
                    </div>
                    <Covid/>
                </form>
            </div>
        );
    }
}