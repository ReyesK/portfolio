const db = require('../models/index');


class CommentManager {

    static create(reqBody, userId) {
      // Comment{message: string, userId: string, pagePath: string}
      const {message, pagePath, ...invalid} = reqBody
      return new Promise(function(resolve, reject) {
        const defaults = {
          message: message,
          userId: userId,
          pagePath: pagePath
        };
        db.Comment.create(defaults)
          .then(comment => {
            resolve(comment);
          })
          .catch(e => {
            reject({message: e.message, status: 500});
          });
      });
    }
}

module.exports = CommentManager;
