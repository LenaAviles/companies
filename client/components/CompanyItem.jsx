import React, { Component } from 'react';


class CompanyItem extends Component { 

  deleteCompany(name) {
    this.props.onDelete(name);
  }

  editCompany(name) {    
    this.props.onEdit(name);
  }

  render() {
   
    return (

        <li className="list-group-item">
        <img className="img-thumbnail App-logo" src={this.props.company.logo} href={this.props.company.logo} role="presentation"></img> 
        
        <strong>{this.props.company.name}</strong>: {this.props.company.earnings} K$ 
         
        <a href="#" className = "pull-right" onClick={this.deleteCompany.bind(this, this.props.company.name)}>| Delete</a>
        <a href="#addCompany" className = "pull-right" onClick={this.editCompany.bind(this, this.props.company.name)}>Edit |</a>
        <br></br>
        </li>

    );
  }
}

export default CompanyItem;
