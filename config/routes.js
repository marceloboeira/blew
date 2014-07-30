
module.exports.routes = {
  paste: '/p/',
  user: '/u/',	

  '/': {
    view: 'homepage'
  },

  '/p/:id': {
      controller: 'paste',
      action: 'view'
  }
};
