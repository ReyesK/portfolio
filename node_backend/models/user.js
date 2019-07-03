// class User extends Sequelize.Model {}
//
// User.init({
//   email: {
//     type: Sequelize.String
//   },
//   familyName: {
//     type: Sequelize.String
//   },
//   givenName: {
//     type: Sequelize.String
//   },
//   googleId: {
//     type: Sequelize.String
//   },
//   locale: {
//     type: Sequelize.String
//   },
//   name: {
//     type: Sequelize.String
//   },
//   picture: {
//     type: Sequelize.String
//   },
// });

class User {
  constructor(params){
    this.email = params.email,
    this.name = params.name,
    this.givenName = params.given_name,
    this.familyName = params.family_name,
    this.locale = params.locale,
    this.googleId = params.sub,
    this.picture = params.picture
  }
}

module.exports = User;
