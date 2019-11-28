import React,{Component} from 'react'
import HostForm from './HostForm'
import VisitorForm from './VisitorForm'

 export class Form extends Component {
    
    sub_style = {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
    } 

    constructor(){
        super();
        this.state = {
            hostID : "",
            heading : "Visitor",
        }
    }

    goBack = (event)=>{
        console.log("Go Back")
        this.props.updateVisitor(true);
        this.props.enableForm();
    }

    componentDidMount(){

        this.setState({
            hostID : this.props.hostID
        })

        if(this.props.isVisitor){
            this.setState({
                heading: "Visitor's"
            });
        }else{
            this.setState({
                heading: "Host's"
            });
        }
    }

    render() {
        return (
        <div className="w-50" className="mx-auto" style={this.sub_style}>
            <div>
                <div className="h2 mt-1 mt-5" style={this.sub_style}>Enter Your Details</div>
                <button href="#" onClick={this.goBack} 
                                className="text-warning z-depth-0 border-0 primary-color mb-1" >
                                    <i className="fas fa-arrow-left"></i> Go Back</button>
                <div className="card  z-depth-0">
                    <div className="card-header head-color">
                        <div style={this.sub_style} className="font-weight-bold"> 
                        {this.state.heading} Form
                        </div>
                    </div>
                    <div className="card-body">
                        {this.props.isVisitor === true ? 
                        <VisitorForm  goBack={this.goBack} hostID={this.state.hostID} sub_style = {this.sub_style} />
                        :<HostForm goBack={this.goBack} />}
                    </div>
                </div>
            </div>
        </div>
        )
    }
 }
 
 export default Form
 
