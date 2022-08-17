import { base_url, api_html_status_threshold, max_acceptable_timeout } from '../config/constants';
import { RequestLogger, Selector } from 'testcafe';
import { apiCallsFailed } from '../helpers/requestHelper';
import adminUser from '../config/roles';
import PSIPage from '../page_objects/psiPage';

const log = require('npmlog');
const psiLogger = RequestLogger(/api\/v1\/trax\/psi/, {logResponseBody: true, logResponseHeaders: true});
const psiPage = new PSIPage();

const testData = {
    psi1: {name: '', psiCode: '', cslCode: '', active: '', transmissionMode: ''},
}

fixture `psi-page`
    .requestHooks(psiLogger)
    .page(base_url)
    .beforeEach( async t => {
        await t
        .useRole(adminUser)
        .navigateTo(base_url)
        .click(psiPage.view);
    })
    .afterEach(() => log.ingo(apiCallsFailed(psiLogger, api_html_status_threshold)));
