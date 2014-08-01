/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
var passport = require('passport');

module.exports = {
	
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },
    
  local: function(req, res) {
    passport.authenticate('local', 
    	function(err, user, info) {
	    	if ((err) || (!user)) {
	         res.send({message: info.message});
	         return res.send(err);

	      }
	      req.logIn(user, function(err) {
	        if (err) res.send(err);
	        res.redirect('/dashboard/?provider=local');
	      });
    	})(req, res);
  },

  github: function (req, res) {
  	passport.authenticate('github', { failureRedirect: '/auth/error?provider=github' },
      function (err, user) {
        req.logIn(user, function (err) {
          if (err) {
            console.log(err);
            return res.view('500');
          }
          return res.redirect('/dashboard/?provider=github');                 
        });
      })(req, res);
  },

  facebook: function (req, res) {
    passport.authenticate('facebook', { failureRedirect: '/auth/error?provider=facebook', scope: ['email'] },
      function (err, user) {
  	    req.logIn(user, function (err) {
          if (err) {
    	      console.log(err);
            return res.view('500');
          }
          return res.redirect('/dashboard/?provider=facebook');	                
    		});
      })(req, res);
    }
};

