import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AuthService = {
  validateJWT: (jwt) => {
    return userFromJWT(jwt);
  },
  userFromJWTCookie: () => {
    return userFromJWT(cookies.get('jwt'));
  },
  logout: () => {
    cookies.remove('jwt');
  }
}

function userFromJWT(jwt) {
  const backendURL = process.env.REACT_APP_BACKEND_BASEURL;
  if (jwt !== undefined) {
    return fetch(backendURL + 'session/user?jwt=' + jwt, {mode: 'cors'})
      .then(res => Promise.all([res, res.json()]))
      .then(([res, json]) => {
        if (res.ok) {
          cookies.set('jwt', json.jwt, {path: '/'}); 
          return {valid: true, user: json.user, jwt: json.jwt, error: null};
        } else {
          throw new Error(json.message);
        }
      })
      .catch(err => {
        cookies.remove('jwt');
        return {valid: false, error: err.message};
      });
  } else {
    return Promise.resolve({valid: false, error: 'no jwt'});
  }

};

export default AuthService;
