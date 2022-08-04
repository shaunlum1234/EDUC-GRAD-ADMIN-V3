import { base_url, api_html_status_threshold, max_acceptable_timeout } from '../config/constants';
import { RequestLogger, Selector } from 'testcafe';
import { apiCallsFailed } from '../helpers/requestHelper';
import adminUser from '../config/roles';
import SchoolsPage from '../page_objects/schoolsPage';

const log = require('npmlog');
const schoolsLogger = RequestLogger(/api\/v1\/trax\/school/, {logResponseBody: true, logResponseHeaders: true});
const schoolsPage = new SchoolsPage();

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
        await t
        .click(schoolsPage.searchSubmit);

        // await t
        // .expect()
    })
