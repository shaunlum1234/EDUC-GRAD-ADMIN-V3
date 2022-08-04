import { Selector, t } from 'testcafe';

class AssessmentsPage {
    constructor() {

        this.view = Selector('#assessments-route');

        this.assessmentTab = Selector('a.nav-link').withExactText('Assessment');
        this.assessmentRequirementsTab = Selector('a.nav-link').withExactText('Assessment requirements');

    }
}

export default AssessmentsPage;
