/**
 * AccountController
 *
 * @description :: Server-side logic for managing Accounts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  'new': function(req,res){
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {

      name: req.param('name'),

      age: req.param('age'),

      email: req.param('email'),

    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    Account.create(paramObj, function accountCreated(err, account) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/account/new');
      }

      // res.json(account);
      res.redirect('/account/show/' + account.id);

    });
  },

  show: function(req, res, next) {
    Account.findOne(req.param('id'), function foundAccount(err, account) {
      if (err) return next(err);
      if (!account) return next();

      // res.json(account);
      res.view({
        account: account
      });
    });
  },

  index: function(req, res, next) {
    Account.find(function foundAccounts(err, accounts) {
      if (err) return next(err);
      
      res.view({
        accounts: accounts
      });
    });
  },

  edit: function(req, res, next) {

    Account.findOne(req.param('id'), function foundAccount(err, account) {
      if (err) return next(err);
      if (!account) return next('account doesn\'t exist.');

      res.view({
        account: account
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      name: req.param('name'),

      age: req.param('age'),

      email: req.param('email'),

    }

    Account.update(req.param('id'), paramObj, function accountUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/account/edit/' + req.param('id'));
      }

      res.redirect('/account/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    Account.findOne(req.param('id'), function foundAccount(err, account) {
      if (err) return next(err);

      if (!account) return next('Account doesn\'t exist.');

      Account.destroy(req.param('id'), function accountDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/account');

    });
  }
 

};

