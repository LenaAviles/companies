import React, { Component } from 'react';
import CompanyItem from './CompanyItem.jsx';

class Companies extends Component {
  deleteCompany(name) {
    this.props.onDelete(name);
  }

  editCompany(name) {    
   this.props.onEdit(name);
  }

  render() {
    let companyItem;
    if(this.props.companies) {
      
      var filtered = this.props.companies.filter(x => x.mainCompany === undefined);     
    
      companyItem =[];
      filtered.forEach(function(element) {      
      companyItem.push ( this.hList(this.props.companies, element, companyItem) )}, this);
    }

    return (
      <div className="Companies">
        <h1>Good Companies</h1>
        {companyItem}
      </div>
    );
  }

  hList(compList, parent, companyItem) {
    var childItems = compList.filter(x => x.mainCompany === parent.name);
    
    if(childItems.length > 0) { 
      let res = [];
      res.push(<CompanyItem onDelete={this.deleteCompany.bind(this)} onEdit={this.editCompany.bind(this)} key={parent.name} company={parent} />);     
      res.push(
      
      <ul className="list-group-item list-group-item-success">        
      { childItems.map(company => {
        return this.hList(compList, company, companyItem);
      }) }
      </ul>);
      return res;
    } 
      return <CompanyItem onDelete={this.deleteCompany.bind(this)} onEdit={this.editCompany.bind(this)} key={parent.name} company={parent} />
  }

}

export default Companies;