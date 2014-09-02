
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

    getLink: function(){
      return sails.config.globals.baseUrl + sails.config.routes.paste + this.id;
    },

    isPrivate: function() {
      return (this.private === true);
    },

    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
	
  }
};

