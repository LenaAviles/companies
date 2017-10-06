import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: {type: String, required: true, unique: true},
    earnings: Number,
    logo: String,
    mainCompany: String,
    subCompanies: [String]
});

const Company = mongoose.model('Company', CompanySchema);