import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CommentService = {
  create: (message, pagePath) => {
    return createComment(message, pagePath, cookies.get('jwt'));
  }
}

// TODO: sanitize all user generated input
function createComment(message, pagePath, jwt) {

  const backendURL = process.env.REACT_APP_BACKEND_BASEURL;

  const reqOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({message: message, pagePath: pagePath}),
  }
  if (jwt) { // comments can be annonymous only set auth header if we have a user.
    reqOptions.headers['Authorization'] = jwt;
  }


  // TODO:
  // handle non 201 responses
  // verifiy comment object gets passed to Promise.resolve
  return fetch(backendURL + 'comments', reqOptions)
              .then(res => {
                res.json().then(comment => Promise.resolve(comment))
                          .catch(err => Promise.reject(err))
              })
              .catch(err => Promise.reject(err))
}


export default CommentService;
