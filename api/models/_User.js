var gravatar = require('gravatar');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

function uuid() {
  return require('node-uuid').v4({msecs: new Date().getTime()}).split('-').join('');
};

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
   		minLength: 6
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

    /** 
     * Get User link, like: /u/username
     * 
     * @param full - Prepend the full URL, like https://blew.io/u/username
     * @return String  
     */
    getLink: function(full) {        
      return ((full === true) ? sails.config.globals.baseUrl : "" ) + sails.config.routes.user + this.username;
    },

    /** 
     * Get User Permanent Link, like: /u/id
     * 
     * @param full - Prepend the full URL, like https://blew.io/u/id
     * @return String  
     */
    getPermalink: function(full) {
      return ((full === true) ? sails.config.globals.baseUrl : "" ) + sails.config.routes.user + this.id;
    },


    /** 
     * Get User gravatar image url
     * 
     * @param attrs
     * @return String  
     */
    getGravatar: function(options, https) {
      return gravatar.url(this.email, options, https);
    },

    /** 
     * Compare user password
     * 
     * @param password - The password to compare
     * @return Boolean 
     */
    verifyPassword: function (password) {
      return bcrypt.compareSync(password, this.password);
    },

    /** 
     * Update user password
     * 
     * @param newPassword - The new password 
     * @param cb - The CallBack function
     * @return Error and the user itself 
     */
    changePassword: function(newPassword, cb){
      this.newPassword = newPassword;
      this.save(function(err, u) {
        return cb(err,u);
      });
    },

    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
  },

  beforeCreate: function (attrs, cb) {

    // Hash + Encrypt the password
    bcrypt.hash(attrs.password, SALT_WORK_FACTOR, function (err, hash) {
      attrs.password = hash;

      // Generate a UUID key to the CLI Tool 
      attrs.cliKey = uuid();
      return cb();    
    });
  },

  beforeUpdate: function (attrs, cb) {

    // Check if there's a NewPassword attribute to encrypt
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
  },

  signUpHandler: function(attrs, cb) {
    
    //Try to find user with same email
    User.findOne({email:attrs.email}).exec(function(err, user){
      if (!user) {
        attrs.username = uuid().slice(0,20);
        console.log(attrs.username);
        User.create(attrs, function (err, user) {
          if (err || !user) {
            console.log(err);
            return cb(err, 'Invalid data');
          }
          return cb(null, 'Ok', user);
        });    
      }
      else {
        return cb(true, 'Email already taken', null);  
      }
      
    }); 

    
  },
};