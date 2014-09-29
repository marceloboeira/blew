
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

    /** 
     * Get the Paste Link, ...
     * 
     * @param full - With the 'http://blew.io/'
     *
     * @return 'http://blew.io/p/12b78c92x0136xzb0ks94jg90'
     */
    getLink: function(full){
      return ((full === true) ? sails.config.globals.baseUrl : "" ) + sails.config.routes.paste + this.id;
    },

    /** 
     * Verify if paste is Private
     * 
     *
     * @return Boolean
     */
    isPrivate: function() {
      return (this.private === true);
    },

    /** 
     * Verify if the given ID is the owner.
     * 
     * @param u - User Object or User Id
     *
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

  beforeCreate: function(attrs, cb){
    attrs.language = detectLanguage(attrs.content) || attrs.language || 'Unknow';
    return cb();
  }
};

