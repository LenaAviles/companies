import mongoose from 'mongoose';

import '../models/Company';

import config from '../../etc/config.json';



//import bluebird from 'bluebird';

//mongoose.Promise = bluebird;

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
    //console.log(data.earnings);
    const company = new Company({
        name: data.name,
        earnings: data.earnings,
        logo: data.logo,
        mainCompany: data.mainCompany,
        subCompanies: data.subCompanies
    });

    //console.log(company);
    return company.save();
}

export function deleteCompany(id) {
    //console.log(id);
    return Company.findById(id).remove();
}

export function updateCompany(id, company) {
    //console.log(id);    
    return Company.update(id, company);
}