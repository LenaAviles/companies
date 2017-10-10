import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _companies = [];
let _loadingError = null;
let _isLoading = true;

function formatCompany(company) {
    return {
        id: company._id,
        name: company.name,
        earnings: company.earnings,
        logo: company.logo || 'https://www.grouptravelvideos.com/images/client/00954/resources/you%20logo%20here.png',
        mainCompany: company.mainCompany,
        subCompanies: company.subCompanies
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getCompanies() {
        return _companies;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_COMPANIES_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_COMPANIES_SUCCESS: {
            _isLoading = false;
            _companies = action.companies.map( formatCompany );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_COMPANIES_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;