
module.exports.routes = {

  '/': {
    view: 'homepage'
  },

  '/p/:id': {
      controller: 'paste',
      action: 'view'
  }
};
