
module.exports = {

  attributes: {

    requester:{
      model:'user',
      required: false // TODO
    },

    requestedAt: {
      type: 'dateTime',
      required: true
    },

    time: {
      type: 'integer'
    },

    params: {
      type: 'text'
    },

    responseCode: {
      type: 'integer'
    },

    responseMessage: {
      type: 'text'
    }
  }
};

