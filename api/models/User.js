
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var SALT_WORK_FACTOR = 10;

module.exports = {
  
  attributes: {

  	name: {
  		type: 'string',
  		required: true,
  		minLength: 3,
  		maxLength: 30
  	},

  	username: {
  		type: 'string',
  		required: true,
      unique: true,
  		minLength: 3,
  		maxLength: 30
  	},

  	email:{ 
  		type: 'email',
  		required: true,
      unique: true
  	},

  	password:{
  		type: 'string',
  		required: true,
  		minLength: 6,
  		maxLength: 50
  	},

    cliKey: {
      type: 'string',
      unique: true
    },

  	keys: {
      collection: 'key',
      via: 'owner'
    },

    pastes: {
      collection: 'paste',
      via: 'owner'
    },

    verifyPassword: function (password) {
      return bcrypt.compareSync(password, this.password);
    },

    changePassword: function(newPassword, cb){
      this.newPassword = newPassword;
      this.save(function(err, u) {
        return cb(err,u);
      });
    }
  },

  beforeCreate: function (attrs, cb) {
    bcrypt.hash(attrs.password, SALT_WORK_FACTOR, function (err, hash) {
      attrs.password = hash;
      attrs.cliKey = uuid.v4({msecs: new Date().getTime()}).replace('-','');
      return cb();    
    });
  },

  beforeUpdate: function (attrs, cb) {
    if(attrs.newPassword){
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return cb(err);

        bcrypt.hash(attrs.newPassword, salt, function(err, crypted) {
          if(err) return cb(err);

          delete attrs.newPassword;
          attrs.password = crypted;
          return cb();
        });
      });
    }
    else {
      return cb();
    }
  }
};

