/**
 * This is 'Common JavaScript' file for '__dirname', yes.
*/

const fs = require('fs');
const path = require('path');
const google = require('googleapis');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');

const getAuthClient = async () => {
    try {
        const content = await readFile(CREDENTIALS_PATH);

        const { client_email, private_key } = JSON.parse(content.toString());

        return new google.Auth.JWT(
            client_email,
            null,
            private_key,
            SCOPES,
            null,
        );
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAuthClient
}