// index.js
const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const config = require('./config');
const serverPort = process.env.PORT || config.serverPort;
var cors = require('cors')

const express = require('express')
const app = express()

//build out our azuread bearer strategy
const authenticationStrategy = new BearerStrategy(config.credentials, (token, done) => {
  let currentUser = null;

  console.log('currentUser: ' + token.upn);

  return done(null, token.upn, token);
});

//tell passport to use our new authentication strategy
passport.use(authenticationStrategy);

app.use(cors())

app.use(passport.initialize());
app.use(passport.session());

//unprotected endpoint
app.get('/', function (req, res) {
  res.send('Hello World!')
})

//endpoint protected by azuread bearar authentication
app.get('/api', passport.authenticate('oauth-bearer', { session: false }), (req, res) => {
  res.json({ message: 'response from protected API endpoint' });
});

app.listen(serverPort, () => console.log(`Example app listening on port ${serverPort}!`))