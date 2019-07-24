var jwtLib = require('jsonwebtoken');
var https = require('https');
var atob = require('atob');
var getPem = require('rsa-pem-from-mod-exp');

const sequelize = require('../models/index');

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
                  } else { // return jwt and user data to requester if valid
                    let defaults = {
                      email: decoded.email,
                      familyName: decoded.family_name,
                      givenName: decoded.given_name,
                      locale: decoded.locale,
                      name: decoded.name,
                      picture: decoded.picture
                    }
                    // TODO move the findOrCreate Update to a helper?
                    sequelize.User.findOrCreate({where: {googleId: decoded.sub}, defaults: defaults})
                                  .then(([user, created]) => {
                                    if(created) {
                                      resolve({jwt: jwt, user: user})
                                    } else {
                                      // TODO check diff in defaults vs user, if no difference no need to update.
                                      sequelize.User.update(defaults, {where: {googleId: decoded.sub}, returning: true})
                                                     .then(([numRows, [user]]) => {
                                                       resolve({jwt: jwt, user: user})
                                                     })
                                    }
                                  })
                                  .catch((e) => {
                                    console.log(e.message);
                                    resolve({error: true, message: e.message, status: 500})
                                  });
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
