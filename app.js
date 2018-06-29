"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const adal_node_1 = require("adal-node");
class TenantInfo {
    constructor() {
        this.tenantId = "";
        this.clientId = "";
        this.clientSecret = "";
        this.resource = "";
    }
}
;
function onAuthComplete(err, resp) {
    if (err) {
        const errResp = resp;
        console.log(`${errResp.error}: ${errResp.errorDescription}`);
    }
    else {
        const tokenResp = resp;
        console.log(tokenResp.accessToken);
    }
}
function getToken(tenantInfo) {
    const authContext = new adal_node_1.AuthenticationContext(`https://login.windows.net/${tenantInfo.tenantId}`);
    authContext.acquireTokenWithClientCredentials(tenantInfo.resource, tenantInfo.clientId, tenantInfo.clientSecret, onAuthComplete);
}
fs.readFile('tenantInfo.json', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    const tenantInfo = JSON.parse(data);
    getToken(tenantInfo);
});
