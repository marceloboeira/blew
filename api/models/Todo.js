    /**
 * Todo
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  /**
   * [attributes description]
   * @type {Object}
   */
  attributes: {
  	title: {
      type: 'String',
      required: true
    },
    isComplete: {
      type: 'Boolean',
      defaultsTo: false
    },
    status:{
      type: 'String',
      required: true
    },
    user: {
      model: 'User'
    }
  },
  
  /**
   * [afterCreate description]
   * @param  {[type]}
   * @param  {Function}
   * @return {[type]}
   */
  afterCreate: function (todo, next) {
    // set message.user = to appropriate user model
    User.getOne(todo.user)
        .spread(function(user) {
          todo.user = user;
          next(null, todo);
        });
  },

  /**
   * [getAll description]
   * @return {[type]}
   */
  getAll: function() {
    return Todo.find().populate('user').then(function (models) {
      return [models];
    });
  },
  
  /**
   * [getOne description]
   * @param  {[type]}
   * @return {[type]}
   */
  getOne: function(id) {
    return Todo.findOne(id).populate('user').then(function (model) {
      return [model];
    });
  }
};
