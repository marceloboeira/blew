
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

    getLink: function(full){
      return ((full === true) ? sails.config.globals.baseUrl : "" ) + sails.config.routes.paste + this.id;
    },

    isPrivate: function() {
      return (this.private === true);
    },

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

