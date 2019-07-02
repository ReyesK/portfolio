var sessionManager = require('../managers/session');

exports.user = function(req, res) {
  const jwt = req.query.jwt;
  sessionManager.verifiedUser(jwt).then((userResponse) => {
    if (userResponse.error) {
      res.status(userResponse.status)
         .send({message: userResponse.message});
    } else {
      res.status(200)
         .send(userResponse);
    }
  });
}
