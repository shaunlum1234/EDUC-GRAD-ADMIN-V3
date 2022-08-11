import { base_url, api_html_status_threshold, max_acceptable_timeout } from '../config/constants';
import { RequestLogger, Selector } from 'testcafe';
import { apiCallsFailed } from '../helpers/requestHelper';
import adminUser from '../config/roles';
import SchoolsPage from '../page_objects/schoolsPage';
import { loadFiles } from 'nconf';

const log = require('npmlog');
const schoolsLogger = RequestLogger(/api\/v1\/trax\/school/, {logResponseBody: true, logResponseHeaders: true});
const schoolsPage = new SchoolsPage();

const testData = {
    school0: {name: 'School cannot be found.', mincode: '12345678'},
    school1: {name: 'ROBERT EDGELL', mincode: '00502001'},
};
const searchMessageResults = {
    notFound: 'not be found',
    emptySearch: 'Enter at least one field to search.',
}

fixture `schools-page`
    .requestHooks(schoolsLogger)
    .page(base_url)
    .beforeEach( async t => {
        await t
        .useRole(adminUser)
        .navigateTo(base_url)
        .click(schoolsPage.view);
    })
    .afterEach(() => log.info(apiCallsFailed(schoolsLogger, api_html_status_threshold)));

    test('empty', async t => {
        log.info(' - testing empty search on Schools view');
        await t
        .click(schoolsPage.searchSubmit);

        await t
        .expect(await schoolsPage.searchMessage.textContent).contains(searchMessageResults.emptySearch);

        log.info(' - testing empty search after form reset on Schools ivew');
        await t
        .typeText(schoolsPage.mincodeInput, testData.school1.mincode)
        .click(schoolsPage.mincodeWildcard)
        .typeText(schoolsPage.schoolNameInput, testData.school1.name)
        .click(schoolsPage.schoolNameWildcard);

        await t
        .click(schoolsPage.formReset)
        .expect(await schoolsPage.searchMessage.textContent).contains(searchMessageResults.emptySearch)
    });

    test('valid search', async t => {
        log.info(' - testing search with valid mincode on Schools view');
        await t
        .click(schoolsPage.mincodeInput)
        .typeText(schoolsPage.mincodeInput, testData.school1.mincode)
        .click(schoolsPage.searchSubmit);

        await t
        .expect(await schoolsPage.searchMessage.textContent)
        .contains('1');

        await t
        .expect(await Selector('div.table-responsive td[data-label="School Name"] div').textContent)
        .contains(testData.school1.name);

        log.info(" - testing search with valid school name on Schools view");
        await t
        .click(schoolsPage.formReset)
        .typeText(schoolsPage.schoolNameInput, testData.school1.name)
        .click(schoolsPage.searchSubmit);

        await t
        .expect(await schoolsPage.searchMessage.textContent)
        .contains('1');

        await t
        .expect(await Selector('div.table-responsive td[data-label="Mincode"] div').textContent)
        .contains(testData.school1.mincode);

    });

    test('valid wildcard search', async t => {
        log.info(' - testing search with wildcard on Schools view');
        await t
        .click(schoolsPage.mincodeInput)
        .typeText(schoolsPage.mincodeInput, testData.school1.mincode.slice(0,3))
        .click(schoolsPage.mincodeWildcard)
        .click(schoolsPage.searchSubmit);

        await t
        .expect(await Selector('div.table-responsive td[data-label="School Name"]').exists)
        .ok();
    });

    test('invalid search', async t => {
        log.info(' - testing search with invalid mincode on Schools view');
        await t
        .click(schoolsPage.mincodeInput)
        .typeText(schoolsPage.mincodeInput, testData.school0.mincode)
        .click(schoolsPage.searchSubmit);

        await t
        .expect(schoolsPage.searchMessage.textContent).contains(searchMessageResults.notFound);
    })
