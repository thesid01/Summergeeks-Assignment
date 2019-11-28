import React, { Component } from 'react'
import '../App.css';
import config from '../config.json'

class ChooseHost extends Component {
    _mounted = false;

    main_style = {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'85vh'
    }
    sub_style = {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
    }

    constructor(){
        super();
        
        this.state = {
            url : config.url,
            hostID:"",
            hostInfo : [],
            isLoaded : false,
            Info : "Your Data is Loading...",
            error : "",
        }
    }

    handleFormSubmit = (event) =>{
        event.preventDefault();
        console.log("Clicked Button");
        this.props.updateHostID(this.state.hostID);
        if(this.state.hostID===""){
            this.setState({
                error: "Host ID Empty"
            });
        }else{
            fetch(this.state.url+"/additional/check-host/"+this.state.hostID)
            .then(res => res.json())
            .then((result) => {
                    console.log(result)
                    if(result.exist===1){
                        this.props.enableForm();
                        if(this._mounted===true){
                            this.setState({
                                error: ""
                            });
                        }
                    }else{
                        if(this._mounted===true){
                            this.setState({
                                error: "Wrong Host ID"
                            });
                        }
                    }
                },(error) => {
                    if(this._mounted===true){
                        this.setState({
                            isLoaded: false,
                            error
                        });
                    }
                }
            )
        }
    }

    handleLinkClick = (event) => {
        event.preventDefault();
        console.log("Clicked Link");
    }

    handleInput = (event)=> {
        this.setState({
            hostID : event.target.value
        },()=>{
            console.log(this.state.hostID);
        })
    }

    showHostForm = ()=>{
        this.props.updateVisitor(false);
        this.props.enableForm();
    }


    componentDidMount(){
        this._mounted = true;
        fetch(this.state.url+"/additional/show-hosts")
        .then(res => res.json())
        .then((result) => {
            console.log(result)
            if(this._mounted===true) {
                this.setState({
                    isLoaded: true,
                    hostInfo: result
                },(err)=>{
                    console.log(this.state.hostInfo);
                });
            }
            },(error) => {
                if(this._mounted===true) {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            }
        )
    }

    componentWillUnmount(){
        this._mounted = false;
    }

    render() {
        return (
            <div className = "main-center" style={this.main_style}>
                <div className="w-70">

                    <div className="font-weight-bold text-warning" style={this.sub_style}>{this.state.error}</div>

                    <div className="h1 mb-5" style={this.sub_style}>
                        Welcome to Entry-Management
                    </div>

                    <form className="w-100" onSubmit={this.handleFormSubmit}>
                        <input type="text" id="host-id" 
                                className="form-control z-depth-1 w-100" 
                                placeholder="Enter Host Id to Visit" 
                                onChange={this.handleInput}
                                value={this.state.hostID}></input>
                        <button className="btn head-color mx-auto mt-4" style={this.sub_style}> Appoint a meeting</button>
                    </form>
                   
                    <div style={this.sub_style}>
                        Don't know Host ID find&nbsp;
                        <button href="#" data-toggle="modal" data-target="#showHost"
                        onClick={this.handleLinkClick} 
                                className="text-warning z-depth-0 border-0 primary-color" >Click here</button>
                                
                    </div>

                    <div className="modal fade" id="showHost" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true">

                    <div className="modal-dialog modal-dialog-centered" role="document">

                        <div className="modal-content">
                        <div className="modal-header head-color">
                            <h5 className="modal-title" id="exampleModalLongTitle">Host Name with ID</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-dark container">
                            <div className="row"><div className="col-6"><strong><u>Host Name</u></strong></div> <div className="col-6"><u>HostID</u></div></div>
                            {this.state.isLoaded===true ? this.state.hostInfo.map((anObjectMapped, index) => {
                                return (
                                    <div className="row" key={`${anObjectMapped._id}`}>
                                        <div className="col-6"><strong>{anObjectMapped.name}</strong></div> <div className="col-6">{anObjectMapped._id}</div>
                                    </div>
                                );
                            }) : this.state.Info}
                        </div>
                        </div>
                    </div>
                    </div>

                    <div style={this.sub_style}>
                        Are You a Host? &nbsp;
                        <button href="#" onClick={this.showHostForm} 
                                className="text-warning z-depth-0 border-0 primary-color" >Register here</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChooseHost
