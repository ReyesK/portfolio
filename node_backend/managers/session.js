const jwtLib = require('jsonwebtoken');
const https = require('https');
const atob = require('atob');
const getPem = require('rsa-pem-from-mod-exp');

const db = require('../models/index');

class SessionManager {

  static userDataChanged(user, data) {
    for(const k in data) {
      if (data[k] != user[k]) return true
    }
    return false
  }

  static verifiedUser(jwt) {
    if (typeof jwt === 'undefined' || !jwt) {return Promise.reject({message: 'JWT not found', status: 401})}
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
                    reject({message: err.name + ': ' + err.message, status: 401})
                  } else { // return jwt and user data to requester if valid
                    let defaults = {
                      email: decoded.email,
                      familyName: decoded.family_name,
                      givenName: decoded.given_name,
                      locale: decoded.locale,
                      name: decoded.name,
                      picture: decoded.picture
                    }

                    db.User.findOrCreate({where: {providerId: decoded.sub}, defaults: defaults})
                                  .then(([user, created]) => {
                                    if(created || !SessionManager.userDataChanged(user, defaults)) {
                                      resolve({jwt: jwt, user: user})
                                    } else { // update user if necessary
                                      db.User.update(defaults, {where: {providerId: decoded.sub}, returning: true})
                                             .then(([numRows, [user]]) => {
                                               resolve({jwt: jwt, user: user})
                                             })
                                    }
                                  })
                                  .catch((e) => {
                                    reject({message: e.message, status: 500})
                                  });
                  }
                });
              } else {
                reject({message: 'JWK not found for ' + kid, status: 401})
              }
            } catch(e) {
              reject({message: e.message, status: 500})
            }
          });
        }).on('error', (e) => {
          reject({message: e.message, status: 500})
        });
      } else {
          reject({message: 'Could not find kid', status: 401})
      }
    });
  }
}

module.exports = SessionManager;
