
var detectLanguage = require('language-classifier');

module.exports = {

  attributes: {
  	
  	name:{
      type: 'string',
      required: true 
    },

    language:{
      type: 'string',
      required: false,
      defaultsTo: null  
    },

  	owner:{
      model:'user',
      required: true
    },

    private:{
    	type:'boolean',
    	required:true,
    	defaultsTo: false
    },

    content:{
    	type:'text',
    	required:true,
    	defaultsTo: null
    },

    expiresAt:{
      type:'date',
      required:false,
      defaultsTo: null
    },

    /** 
     * Get the Paste Link, ...
     * 
     * @param full - With the 'http://blew.io/'
     * @return 'http://blew.io/p/5422d5f8844e460b00ac36fb'
     */
    getLink: function(f){
      return ((f === true) ? sails.config.globals.baseUrl : "" ) + sails.config.routes.paste + this.id;
    },

    /** 
     * Verify if paste is Private
     * 
     * @return Boolean
     */
    isPrivate: function() {
      return (this.private === true);
    },

    /** 
     * Verify if the paste expires
     *
     * @see https://github.com/vimia/blew/issues/3
     * @return Boolean
     */
    itExpires: function() {
      return (this.expiresAt !== null);
    },

    /** 
     * Verify if the paste is expired
     *
     * @see https://github.com/vimia/blew/issues/3
     * @return Boolean
     */
    isExpired: function() {
      return (this.itExpires() ? (new Date().getTime() > new Date(this.expiresAt).getTime()) : false);
    },

    /** 
     * Verify if the given ID is the owner.
     * 
     * @param u - User Object or User Id
     * @return Boolean
     */
    isOwner: function(u) {
      var id = (u.id == undefined) ? u : u.id;
      return (this.owner.id === id);
    },

    toJSON: function() {
      var obj = this.toObject();
      obj.link = obj.getLink(true);
      return obj;
    }
	
  },

  beforeValidate: function(attrs, cb) {
    // @see https://github.com/vimia/blew/issues/3
    attrs.expiresAt = (attrs.expiresAt !== null) ? FilterService.durationToDate(attrs.expiresAt) : null;

    return cb();
  },

  beforeCreate: function(attrs, cb){
    attrs.language = detectLanguage(attrs.content) || attrs.language || 'Unknow';
  
    return cb();
  }
};

