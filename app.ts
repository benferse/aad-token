import fs = require('fs');
import {AuthenticationContext, ErrorResponse, TokenResponse} from 'adal-node';

class TenantInfo {
    tenantId: string = "";
    clientId: string = "";
    clientSecret: string = "";
    resource: string = "";
};

function onAuthComplete(err: Error, resp: ErrorResponse | TokenResponse) {

    if (err) {
        const errResp: ErrorResponse = resp as ErrorResponse;
        console.log(`${errResp.error}: ${errResp.errorDescription}`);
    } else {
        const tokenResp: TokenResponse = resp as TokenResponse;
        console.log(tokenResp.accessToken);
    }
}

function getToken(tenantInfo: TenantInfo) {

    const authContext = new AuthenticationContext(`https://login.windows.net/${tenantInfo.tenantId}`);
    authContext.acquireTokenWithClientCredentials(tenantInfo.resource, tenantInfo.clientId, tenantInfo.clientSecret, onAuthComplete);
}

fs.readFile('tenantInfo.json', 'utf8', (err, data) => {

    if (err) {
        throw err;
    }

    const tenantInfo: TenantInfo = JSON.parse(data);
    getToken(tenantInfo);
})