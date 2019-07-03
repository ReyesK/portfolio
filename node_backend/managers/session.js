var jwtLib = require('jsonwebtoken');
var https = require('https');
var atob = require('atob');
var getPem = require('rsa-pem-from-mod-exp');

const User = require('../models/user');

class SessionManager {

  static verifiedUser(jwt) {

    const parts = jwt.split('.');
    const kid = JSON.parse(atob(parts[0])).kid; // get kid from jwt header
    return new Promise(function(resolve, reject) {
      if (kid) {
        https.get('https://www.googleapis.com/oauth2/v3/certs', (googleRes) => { // if supporting multiple token providers this hardcoded url will need to change.
          let rawData = '';
          googleRes.on('data', (chunk) => {rawData += chunk;});
          googleRes.on('end', ()=> {
            try {
              const data = JSON.parse(rawData);
              let keyUsed = null;
              data.keys.forEach((key) => {
                if(key.kid === kid) {
                  keyUsed = key
                }
              });
              if (keyUsed){ // if we find the key data we need use it
                const pubKey = getPem(keyUsed.n, keyUsed.e);
                jwtLib.verify(jwt, pubKey, function(err, decoded) {
                  if (decoded === undefined) {
                    resolve({error: true, message: err.name + ': ' + err.message, status: 401})
                  } else {
                    resolve({ // return jwt and user data to requester if valid
                      jwt: jwt,
                      user: new User(decoded)
                    })
                  }
                });

              } else {
                resolve({error: true, message: 'JWK not found for ' + kid, status: 401})
              }
            } catch(e) {
              resolve({error: true, message: e.message, status: 500})
            }
          });
        }).on('error', (e) => {
          resolve({error: true, message: e.message, status: 500})
        });
      } else {
          resolve({error: true, message: 'Could not find kid', status: 401})
      }
    });
  }
}

module.exports = SessionManager;
