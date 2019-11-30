import React, { Component } from 'react'
import config from '../config.json'


class HostForm extends Component {
    _errors = {
        username: "",
        email: "",
        phoneNumber : ""
    }

    _isFormValid = 0;

    constructor(){
        super();
        this.state={
            url : config.url,
            email : "",
            name : "",
            phoneNumber : "",
            address : "",
            _formError : "",
            success: ""
        }
    }

    handleEmail = (event)=>{
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!event.target.value.match(pattern)) {
            this._errors.email = "*Please enter Valid Email ID";
        }else{
            this._errors.email = "";
        }
        this.setState({
            email:event.target.value
        })
    }

    handleName = (event)=>{
        if (!event.target.value.match(/^[a-zA-Z ]*$/)) {
            this._errors.username = "*Please enter alphabet characters only.";
        }else{
            this._errors.username = "";
        }
        this.setState({
            name:event.target.value
        })
    }

    handlePhoneNumber = (event)=>{
        if (!event.target.value.match(/^[0-9]*$/)) {
            this._errors.phoneNumber = "*Please enter Number Only.";
        }else if(event.target.value.length!==10){
            this._errors.phoneNumber = "Mobile Number should be of 10 digit";
        }else{
            this._errors.phoneNumber="";
        }
        this.setState({
            phoneNumber:event.target.value
        })
    }

    handleAddress = (event)=>{
        this.setState({
            address:event.target.value
        })
    }

    handleSubmit = (event)=>{
        
        event.preventDefault();

        if(this._errors.username===""
            &&this._errors.email===""
            &&this._errors.phoneNumber===""){

                this.setState({
                    _formError : "" 
                });
                console.log(JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    address: this.state.address
                }));
                
                fetch(this.state.url+ "/host/add", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        email: this.state.email,
                        phoneNumber: this.state.phoneNumber,
                        address: this.state.address
                    })
                })
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                    if(result.added === 1){
                        this.setState({
                            success : "Data Submitted Successfully."
                        })
                    }else{
                        this.setState({
                            success: "Error Saving Information Try Again"
                        })
                    }
                });
            }else{
                this.setState({ 
                    _formError : "*Enter all fields correctly."
                })
            }
    }

    render(){
        return (
            <div className=" mx-5">
                <small className="text-danger">{this.state._formError}</small>
                <form className="text-center " onSubmit={this.handleSubmit}>
                    <small className="text-danger">{this._errors.username}</small>
                    <input required type="text" id="FirstName"
                        name="name"
                        className="form-control mb-4"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleName} ></input>
                    
                    <small className="text-danger">{this._errors.email}</small>
                    <input required type="email" id="FormEmail"
                        name="email"
                        className="form-control mb-4" 
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleEmail}></input>

                    <small className="text-danger">{this._errors.phoneNumber}</small>
                    <input required type="text" id="FormPhone" 
                        name="phoneNumber"
                        className="form-control mb-4" 
                        placeholder="Phone Number"
                        value={this.state.phoneNumber}
                        onChange={this.handlePhoneNumber}></input>
                    
                    <input required type="text" id="FormAddress"
                        name="address"
                        className="form-control mb-4" 
                        placeholder="Address"
                        value={this.state.address}
                        onChange={this.handleAddress}></input>

                    <button className="btn btn-info my-4 btn-block" type="submit">Become a Host</button>
                    <small className="text-danger">{this.state.success}</small>
                </form>
                <div className="text-center"><small className="text-danger mx-auto" style={this.props.sub_style}>
                    Not a Host?&nbsp; <button className="border-0 white" onClick={this.props.goBack}>Click Here</button>
                </small></div>
            </div>
        )
    }
}

export default HostForm