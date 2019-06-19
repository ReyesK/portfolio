var express = require('express');
var router = express.Router();
var jwtLib = require('jsonwebtoken');
var https = require('https');
var atob = require('atob');
var getPem = require('rsa-pem-from-mod-exp');


router.get('/verify', function(req, res, next) {
  // TODO refactor jwt check to somewhere else
  const jwt = req.query.jwt;
  const parts = jwt.split('.');
  const kid = JSON.parse(atob(parts[0])).kid; // get kid from jwt header
  if (kid) {
    https.get('https://www.googleapis.com/oauth2/v3/certs', (googleRes) => { // if supporting multiple token providers this will need to change.
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
                //error
                console.log('error');
                console.log(err);
                res.send(err);
              } else {
                console.log('valid jwt');
                console.log(decoded);
                res.send('API is working properly');
              }
            });

          } else { // TODO send back errors as an object?
            res.send('error key not found.'); // check google url and kid against keys listed at google url
          }
        } catch(e) {
          console.error(e.message);
          res.send(e.message);
        }
      });
    }).on('error', (e) => {
      console.error(e.message);
      res.send(e.message);
    });
  } else {
    res.send('Could not find kid');
  }
});

module.exports = router;
