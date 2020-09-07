const sessionManager = require('../managers/session')

module.exports = function(req, res, next) {
  sessionManager.verifiedUser(req.headers.authorization)
    .then(managerResponse => {
      req.currentUser = managerResponse.user
    })
    .catch((e) => { req.currentUser = null })
    .then(() => {
      next()
    })
}
