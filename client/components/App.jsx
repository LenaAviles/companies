import React, { Component } from 'react';
import Companies from './Companies.jsx';
import AddCompany from './AddCompany.jsx';
import CompanyActions from '../actions/CompanyActions';
import '../App.css';

import CompaniesStore from '../stores/CompaniesStore';

function getStateFromFlux() {
    return {
        isLoading: CompaniesStore.isLoading(),
        companies: CompaniesStore.getCompanies()
    };
}

class App extends Component {
  constructor() {
    super();
    this.state = getStateFromFlux();
  }

  getCompanies() {
    var defaultCompanies = {companies: [
      {
        name: 'Nestle',
        earnings: '89,469 bn $',
        logo: 'https://www.csuohio.edu/business/sites/csuohio.edu.business/files/images/news/Nestle_textlogo.png',
        mainCompany: false,
        subsdiaryCompanies: [] 
      },
      {
        name: 'General Electric',
        earnings: '146,045 bn $',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/General_Electric_logo.svg/225px-General_Electric_logo.svg.png',
        mainCompany: false,
        subsdiaryCompanies: []
      },
    ]};
    this.setState(defaultCompanies);
  }

  componentDidMount() {
      CompaniesStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
      CompaniesStore.removeChangeListener(this._onChange.bind(this));
  }

  componentWillMount() {    
    CompanyActions.loadCompanies();
  }

  handleAddCompany(company) {
    let companies = this.state.companies;
    companies.push(company);
    this.setState({companies:companies});    
    CompanyActions.createCompany(company);        
  }

  handleDeleteCompany(name) {
    let companies = this.state.companies;
    let index = companies.findIndex(x => x.name === name);
    let delItem = companies.splice(index, 1);
    this.setState({companies:companies});    
    CompanyActions.deleteCompany(delItem[0].id);
  }

  handleEditCompany(name) {    
    let companies = this.state.companies;
    let index = companies.findIndex(x => x.name === name);
    let editCompany = companies.find(x => x.name === name);        
    this.setState({companies:companies, onEdit:editCompany});    
  }

  handleUpdateCompany(company){
    let companies = this.state.companies;
    let index = companies.findIndex(x => x.name === company.name);
    companies[index] = company;     
    this.setState({ companies:companies });    
    CompanyActions.updateCompany(company);    
  }

  render() {    
    return (
      <div className="App">
        <AddCompany addCompany={this.handleAddCompany.bind(this)} onEdit={this.handleUpdateCompany.bind(this)} editedCompany = {this.state.onEdit}/>
        <hr />
        <Companies companies={this.state.companies} onDelete={this.handleDeleteCompany.bind(this)} onEdit={this.handleEditCompany.bind(this)} />
                
      </div>
    );
  }

  _onChange() {        
      this.setState(getStateFromFlux());      
  }
}

export default App;
