
module.exports.routes = {
  
  '/': {
    view: 'homepage',
  },

  user: '/u/',  

  '/u/:username': {
      controller: 'user',
      action: 'view'
  },


  paste: '/p/',

  '/p/:id': {
      controller: 'paste',
      action: 'view'
  },

  'get /auth/sign-in': {
      controller: 'auth',
      action: 'sign-in'
  },

  'post /auth/sign-in': {
      controller: 'auth',
      action: 'local'
  },
};
