
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
  }
};
