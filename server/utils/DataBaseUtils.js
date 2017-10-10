import mongoose from 'mongoose';

import '../models/Company';

import config from '../../etc/config.json';

const Company = mongoose.model('Company');

export function setUpConnection() {    
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
        useMongoClient: true
    });
}

export function listCompanies() {
    return Company.find();
}

export function createCompany(data) {    
    const company = new Company({
        name: data.name,
        earnings: data.earnings,
        logo: data.logo,
        mainCompany: data.mainCompany,
        subCompanies: data.subCompanies
    });
    
    return company.save();
}

export function deleteCompany(id) {    
    return Company.findById(id).remove();
}

export function updateCompany(company) {        
    return Company.update({"_id": company.id}, {
        name: company.name,
        earnings: company.earnings,
        logo: company.logo,
        mainCompany: company.mainCompany,
        subCompanies: company.subCompanies
    });
}