import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const CompanyActions = {
    loadCompanies() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_COMPANIES_REQUEST
        });

        api.listCompanies()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_COMPANIES_SUCCESS,
                companies: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_COMPANIES_FAIL,
                error: err
            })
        );
    },

    createCompany(company) {
        api.createCompany(company)
        .then(() =>
            this.loadCompanies()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteCompany(companyId) {
        api.deleteCompany(companyId)
        .then(() =>
            this.loadCompanies()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateCompany(companyId, editedCompany) {
        
        api.updateCompany(companyId, editedCompany)        
        .then(() =>
            this.loadCompanies()
        )
        .catch(err =>
            console.error(err)
        );
        //console.log(api.updateCompany(companyId, editedCompany));
    }
};

export default CompanyActions;