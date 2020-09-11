const commentManager = require('../managers/comment');

exports.create = function(req, res) {

  const userId = req.currentUser && req.currentUser.providerId

  commentManager
        .create(req.body, userId)
        .then(comment => {
          res.status(201)
             .send(comment)
        })
        .catch(error => {
          res.status(error.status)
             .send(error.message)
        });
}
