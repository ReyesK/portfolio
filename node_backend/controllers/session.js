const manager = require('../managers/session');

exports.user = function(req, res) {
  const jwt = req.query.jwt;

  manager.verifiedUser(jwt)
    .then(userResponse => {
      res.status(200)
         .send(userResponse);
    })
    .catch(error => {
      res.status(error.status)
         .send({message: error.message});
    });
}
