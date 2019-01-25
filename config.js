const tenantName    = 'OUR_TENANT_NAME';
const clientID      = 'CLIENT_ID_OF_OUR_APPLICATION_IN_AZUREAD';
const serverPort    = 3000;

module.exports.serverPort = serverPort;

module.exports.credentials = {
  identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/.well-known/openid-configuration`, 
  clientID: clientID,
  loggingLevel: 'info'
};
