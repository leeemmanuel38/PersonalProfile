import React, { Component } from 'react';
import axios from 'axios';



export default class UploadPhoto extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false, 
      url : ""
    }
  }
  
  handleChange = (event) => {
    event.preventDefault(); 
    this.setState({
        success: false, 
        url : ""
    });
  }

  // Perform the upload
  handleUpload = (event) => {
    event.preventDefault();
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    //console.log("uploading...");
    axios.post("http://ec2-34-203-244-60.compute-1.amazonaws.com:9000/sign_s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        this.setState({url: url})
        window.localStorage.setItem('URL', url); 
        //console.log("Recieved a signed request " + signedRequest);
      
     // Put the fileType in the headers for the upload
      const options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        //console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {
    const url = window.localStorage.getItem('URL'); 

    const SuccessMessage = () => (
        <div>
          <a href={this.state.url}>View Photo</a>
        </div>
      )

    return (
        <div>
            <form className="userPicture">
                <img 
                    src={url}
                    height="287"
                    width="346"
                    alt="Profile"
                />
            </form>
            <form className="upload">
            <h5>Upload a photo to s3</h5>
            <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
        
            <button onClick={this.handleUpload}>UPLOAD</button>
            {this.state.success ? <SuccessMessage/> : null}
            </form>
        </div>
    );
  }
}