
module.exports = {

  attributes: {
    owner:{
      model:'user',
      required: true
    },
  	
    token: {
  		type: 'string',
      required: true,
      unique: true
  	},
  	
    secret: {
  		type: 'string',
      required: true
  	},
    
    active:{
      type: 'boolean',
      required: true,
      defaultsTo: false  
    }
  }
};

