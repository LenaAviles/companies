import React, { Component } from 'react';

import CompaniesStore from '../stores/CompaniesStore';

class AddCompany extends Component {
  constructor() {
    super();        
    this.state = {
      newCompany:{}, hideMain: 'false', editedCompany:{}
    }
  }
  
  handleSubmit(e) {
    if(this.refs.name.value === '') {
        alert('Title is required');
    } else if (this.refs.earnings.value === '') {
        alert('Earnings is required');
    } else if (this.refs.mainCompany.value === '' && !this.state.hideMain) {
        alert('Select checkbox Main Company or enter Main Company value');
    } else if (this.props.editedCompany) {
      this.setState({editedCompany:{
        name: this.refs.name.value,
        earnings: Number(this.refs.earnings.value),
        logo: this.refs.logo.value,
        mainCompany: this.refs.mainCompany.value,
        id: this.props.editedCompany.id
      }}, function() {
        //console.log(this.state.editedCompany);
        this.props.onEdit(this.state.editedCompany.name);        
      });
    } else {      
      this.setState({newCompany:{
        name: this.refs.name.value,
        earnings: Number(this.refs.earnings.value),
        logo: this.refs.logo.value,
        mainCompany: this.state.hideMain === 'false' ? undefined : this.refs.mainCompany.value
      }}, function() {
        this.props.addCompany(this.state.newCompany);
      });
    }
    e.preventDefault();    
  }

  handleCheckedMain(e) {
    this.setState({hideMain: !this.state.hideMain});  
    //e.preventDefault();
  }

  render() {
    let hideMain = this.state.hideMain; 
    let companies = this.companiesList();
    let myMode = this.props.editedCompany ? 'Edit' : 'Add'; 
    let cName, cEarnings, cLogo;     
    if (this.props.editedCompany) {
      cName = this.props.editedCompany.name;
      cEarnings = this.props.editedCompany.earnings;
      cLogo = this.props.editedCompany.logo;      
    }

    return (
      <div className="jumbotron">
        <h3 id="addCompany">{myMode} Company</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="row">
          <div className="col-sm-3">
            <label>Company Name</label><br />            
            <input className="form-control" id="companyName" type="text" ref="name" placeholder={cName} />
          </div>
          <div className="col-sm-3">
            <label>Company Logo</label><br />
            <input className="form-control" id="logoURL" type="url" ref="logo" placeholder={cLogo}/>            
          </div>
          <div className="col-sm-3">
            <label>Earnings</label><br />
            <input className="form-control" id="companyEarnings" type="number" ref="earnings" placeholder=" K$" placeholder={cEarnings}/>            
          </div>
          <div className="col-sm-3">
            <div>            
            <input type="checkbox" id="mainCheckbox" ref="mainCheckBox" checked = {hideMain} 
		        onChange={this.handleCheckedMain.bind(this)}/>
            <label>  Main Company</label>
          </div>
          <div>            
            <select className="form-control" id="mainCompany" ref="mainCompany" disabled={hideMain}>
              { companies }
            </select>
          </div>
          </div>
          </div>

          <br />
          <input className="btn btn-default pull-right" id="submitButton" type="submit" value="Submit" />
          <br />
        </form>
      </div>
    );
  }

  companiesList() {
    let companies = CompaniesStore.getCompanies().map(company => {
      return <option>{ company.name }</option>
    });    
    return companies;
  }
  
}

export default AddCompany;
