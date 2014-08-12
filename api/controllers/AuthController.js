/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
var passport = require('passport');

module.exports = {
	
  "sign-up": function(req, res) {
    return res.view();
  },

  "sign-in": function(req, res) {
    return res.view();
  },

  "sign-out": function (req, res) {
    req.logout();
    return res.redirect('/?good-bye=true');
  },
    
  local: function(req, res) {
    passport.authenticate('local', 
    	function(err, user, info) {
	    	if (err)
	         return res.serverError(err);
        if (!user)
          return res.view("auth/sign-in",{error:info.message});
        
	      req.logIn(user, function(err) {
	        if (err) return res.serverError(err); 
	        return res.redirect('/dashboard/?p=local');
	      });
    	})(req, res);
  },

  github: function (req, res) {
  	passport.authenticate('github', { failureRedirect: '/auth/error?p=github' },
      function (err, user) {
        req.logIn(user, function (err) {
          if (err) {
            console.log(err);
            return res.serverError(err);
          }
          return res.redirect('/dashboard/?p=github');                 
        });
      })(req, res);
  }
};

