
module.exports.routes = {
  
  '/': {
    controller: 'index',
    action: 'index'
  },

  user: '/u/',  
  '/u/:username': {
    controller: 'user',
    action: 'view'
  },

  me: '/me/',  
  '/me': {
    controller: 'user',
    action: 'me'  
  },

  'get /me/change-password': {
    controller: 'user',
    action: 'change-password'
  },

  'post /me/change-password': {
    controller: 'user',
    action: 'change-password-post'
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
    action: 'sign-in-post'
  },

  'get /auth/sign-up': {
    controller: 'auth',
    action: 'sign-up'
  },

  'post /auth/sign-up': {
    controller: 'auth',
    action: 'sign-up-post'
  },

};
