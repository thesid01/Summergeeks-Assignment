import React, {Component} from 'react';
import './App.css';
import ChooseHost from './components/ChooseHost';
import Header from './components/Header';
import Form from './components/Form';
import './config.json';

class App extends Component{

  constructor(){
    super();
    this.state = {
      url : "http://localhost:3000",
      gotSearchInfo : "Data Loading",
      VisitorsInfo : [],
      showForm : false,
      showVisitors: false,
      hostID : "",
      visitor : true
    }
  }

  stateHandler = ()=>{
    console.log(this.state.showForm);
    this.setState({
      showForm : !this.state.showForm
    },()=>{
      console.log(this.state.showForm)
    })
  }

  updateHostID = (ID)=>{
    this.setState({
      hostID : ID
    })
  }

  updateVisitor = (value)=>{
    this.setState({
      visitor: value
    })
  }

  showVisitors = () => {
    fetch(this.state.url+"/additional/get-visitors")
        .then(res => res.json())
        .then((result) => {

            console.log(result)
              this.setState({
                  VisitorsInfo : result,
              },(err)=>{
                  console.log(this.state.hostInfo);
              });
            },(error) => {
              console.log("Cannot Fetch");
            }
        )
  }

  showVisitors_table = () =>{
    this.setState({
      showVisitors : true
    })
  }
  
  hideVisitors_table = () =>{
    this.setState({
      showVisitors : false
    })
  }

  componentDidMount(){
    this.showVisitors();
  }

  render(){
    if(this.state.showVisitors===true){
      return(
        <div>
          <Header/>
        
        <div className="m-3">
          <div className="h1"> Active Visitors</div>
          <button href="#" onClick={this.hideVisitors_table} 
              className="text-warning z-depth-0 border-0 primary-color mb-1" >
                  <i className="fas fa-arrow-left"></i> Go Back</button>
            <table id="dtBasicExample" className="red lighten-5 table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th className="th-sm font-weight-bold">Name
                  </th>
                  <th className="th-sm font-weight-bold">Email
                  </th>
                  <th className="th-sm font-weight-bold">Phone Number 
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.state.VisitorsInfo.length !==0 ? this.state.VisitorsInfo.map((anObjectMapped, index) => {
                if(anObjectMapped.checkOut<=anObjectMapped.checkIn)
                return (
                  <tr key={`${anObjectMapped._id}`}>
                    <td ><strong>{anObjectMapped.name} </strong></td>
                    <td ><strong>{anObjectMapped.email}</strong></td>
                    <td ><strong>{anObjectMapped.phoneNumber}</strong></td>
                  </tr>
                )
              }) : this.state.gotSearchInfo}
              </tbody>
              <tfoot>
                <tr>
                <th className="th-sm font-weight-bold">Name
                  </th>
                  <th className="th-sm font-weight-bold">Email
                  </th>
                  <th className="th-sm font-weight-bold">Phone Number 
                  </th>
                </tr>
              </tfoot>
          </table>
        </div>
      </div>
      );
    }else{
      return(
        <div>
          <Header/>
          {this.state.showForm === false ?
            <ChooseHost showVisitors_table={this.showVisitors_table} enableForm = {this.stateHandler} updateVisitor={this.updateVisitor} updateHostID = {this.updateHostID} />
            : <Form hostID= {this.state.hostID} enableForm = {this.stateHandler} updateVisitor={this.updateVisitor} isVisitor = {this.state.visitor} />}
        </div>
      );
    }
  }
}

export default App;
