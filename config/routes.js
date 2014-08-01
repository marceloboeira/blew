
module.exports.routes = {
  paste: '/p/',
  user: '/u/',	

  '/': {
    view: 'homepage'
  },

  '/u/:id': {
      controller: 'user',
      action: 'view'
  },

  '/p/:id': {
      controller: 'paste',
      action: 'view'
  }
};
