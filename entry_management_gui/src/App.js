import React, {Component} from 'react';
import './App.css';
import ChooseHost from './components/ChooseHost'
import Header from './components/Header'
import Form from './components/Form'

class App extends Component{

  constructor(){
    super();
    this.state = {
      showForm : false,
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
  render(){
    return(
      <div>
        <Header/>
        {this.state.showForm === false ?
          <ChooseHost enableForm = {this.stateHandler} updateVisitor={this.updateVisitor} updateHostID = {this.updateHostID} />
          : <Form hostID= {this.state.hostID} enableForm = {this.stateHandler} updateVisitor={this.updateVisitor} isVisitor = {this.state.visitor} />}
      </div>
    );
  }
}

export default App;
