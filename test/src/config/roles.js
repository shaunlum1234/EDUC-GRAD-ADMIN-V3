import { Role } from 'testcafe';
import { base_url, credentials } from './constants';
import log from "npmlog";

const adminUser = Role(base_url + '/?login=noidir', async t => {
    log.info('Inputting credentials for: ');
    log.info(credentials.adminCredentials.username);
    await t
        .typeText('#username', credentials.adminCredentials.username)
        .typeText('#password', credentials.adminCredentials.password)
        .click('#kc-login');
});

module.exports = adminUser;