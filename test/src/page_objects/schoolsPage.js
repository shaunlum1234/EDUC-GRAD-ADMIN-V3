import { Selector, t } from 'testcafe';

class SchoolsPage {
    constructor() {

        this.view = Selector('#schools-route');

        // search inputs
        this.mincodeInput = Selector('input#mincode');
        this.mincodeWildcard = Selector('input#mincode').sibling('div.wild-card-button');

        this.schoolNameInput = Selector('input#schoolName');
        this.schoolNameWildcard = Selector('input#schoolName').sibling('div.wild-card-button');

        // form buttons
        this.searchSubmit = Selector('div.active button').withExactText('Search');
        this.formReset = Selector('button').withExactText('Reset');

        // search message
        this.searchMessage = Selector('div.search-results-message strong');

    }
}

export default SchoolsPage;
