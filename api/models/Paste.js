
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

    toJSON: function() {
      var obj = this.toObject();
      obj.link = "http://blew.io/p/" + obj.id;
      return obj;
    }
	
  }
};

