import React, { Component } from 'react';
import AddCompany from './AddCompany.jsx';

class CompanyEditor extends Component {
    
  
    handleAddCompany(company) {
    let companies = this.state.companies;
    companies.push(company);
    this.setState({companies:companies});    
    CompanyActions.createCompany(company);        
  }

  render() {
    //console.log(this.props);
    return (
        <AddCompany addCompany={this.handleAddCompany.bind(this)} />
    );
  }
}

export default CompanyEditor;