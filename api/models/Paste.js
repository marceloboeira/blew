/**
 * [exports description]
 * @type {Object}
 */
module.exports = {

  /**
   * [attributes description]
   * @type {Object}
   */
  attributes: {

    name:{
      type: 'String',
      required: true
    },

    language:{
      type: 'String',
      required: false,
      defaultsTo: null
    },

    owner:{
      model:'User',
      required: true
    },

    private:{
      type:'Boolean',
      required:true,
      defaultsTo: false
    },

    content:{
      type:'Text',
      required:true,
      defaultsTo: null
    },

    expiresAt:{
      type:'Date',
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

    /**
     * Injecting fake stuff
     *
     * @override
     * @return {[type]}
     */
    toJSON: function() {
      var obj = this.toObject();
      obj.link = obj.getLink(true);
      return obj;
    }

  },

  /**
   * [beforeValidate description]
   * @param  {[type]}
   * @param  {Function}
   * @return {[type]}
   */
  beforeValidate: function(attrs, cb) {
    // @see https://github.com/vimia/blew/issues/3
    attrs.expiresAt = (attrs.expiresAt !== null) ? FilterService.durationToDate(attrs.expiresAt) : null;

    return cb();
  },

  /**
   * [beforeCreate description]
   * @param  {[type]}
   * @param  {Function}
   * @return {[type]}
   */
  beforeCreate: function(attrs, cb){
    attrs.language = detectLanguage(attrs.content) || attrs.language || 'Unknow';

    return cb();
  }
};

