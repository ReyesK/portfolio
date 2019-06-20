var express = require('express');
var router = express.Router();
var jwtLib = require('jsonwebtoken');
var https = require('https');
var atob = require('atob');
var getPem = require('rsa-pem-from-mod-exp');


router.get('/verify', function(req, res, next) { // TODO rename route to user or something?
  // TODO refactor jwt check to somewhere else
  const jwt = req.query.jwt;
  const parts = jwt.split('.');
  const kid = JSON.parse(atob(parts[0])).kid; // get kid from jwt header
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
                res.status(401)
                   .send({message: err.name + ': ' + err.message});
              } else {
                res.send({ // return jwt and user data to requester if valid
                  jwt: jwt,
                  user: {
                    email: decoded.email,
                    name: decoded.name,
                    givenName: decoded.given_name,
                    familyName: decoded.family_name,
                    locale: decoded.locale,
                    googleId: decoded.sub,
                    picture: decoded.picture
                  }
                });
              }
            });

          } else {
            res.status(401)
               .send({message: 'JWK not found for ' + kid}); // check google url and kid against keys listed at google url
          }
        } catch(e) {
          res.status(500)
             .send({message: e.message});
        }
      });
    }).on('error', (e) => {
      res.status(500)
         .send({message: e.message});
    });
  } else {
    res.status(401)
       .send({message: 'Could not find kid'});
  }
});

module.exports = router;
