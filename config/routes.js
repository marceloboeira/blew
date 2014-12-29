/**
 * Routes
 *
 * Your routes map URLs to views and controllers.
 * 
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.) 
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg` 
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or 
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {
  /** We set the default language for all routes */
  '/*': function(req, res, next) {
    res.setLocale(req.param('lang') || sails.config.i18n.defaultLocale);
    res.setLocale(sails.config.i18n.defaultLocale);
    return next();
  },
  
  'GET /': {
    controller: 'HomeController',
    action: 'index'
  },

  'GET /login': 'AuthController.login',
  'GET /logout': 'AuthController.logout',
  'GET /register': 'AuthController.register',

  'POST /auth/local': 'AuthController.callback',
  'POST /auth/local/:action': 'AuthController.callback',

  'GET /auth/:provider': 'AuthController.provider',
  'GET /auth/:provider/callback': 'AuthController.callback',

  /* User routes */
  'GET /api/user': 'UserController.getAll',
  'GET /api/user/:id': 'UserController.getOne',
  'POST /api/user': 'UserController.create',

  /** Message routes */
  'GET /api/message': 'MessageController.getAll',
  'GET /api/message/:id': 'MessageController.getOne',
  'POST /api/message': 'MessageController.create',
  'PUT /api/message': 'MessageController.update',
  //'PUT /api/message/:id': 'MessageController.update',
  //'DELETE /api/message/:id': 'MessageController.destroy',

  /* Todo routes */
  'GET /api/todo': 'TodoController.getAll',
  'GET /api/todo/:id': 'TodoController.getOne',
  'POST /api/todo': 'TodoController.create',
  'DELETE /api/todo/:id': 'TodoController.destroy',
  'PUT /api/todo': 'TodoController.update',

  // If a request to a URL doesn't match any of the custom routes above, it is matched 
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.
  'GET /home': 'HomeController.index',
  'GET /about': 'HomeController.index',
  'GET /messages': 'HomeController.index',
  'GET /todos': 'HomeController.index'

};
