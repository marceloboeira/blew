/** 
 * View Filters
 *
 * @see https://github.com/vimia/blew/issues/23
 */


var filters = require('ejs').filters;

/** 
 * Apply moment.js at server-side as a  filter
 * 
 * @param d - Dirty Date
 * @return 'x days ago' 
 */
filters.dateFromNow = function(d) {
	var moment = require('moment');
	return moment(d).fromNow();
},

/** 
 * Create default title
 * 
 * @param t - to Append Title
 * @return nice pageTitle 
 */
filters.pageTitle = function(a, t) {
	return ((t != undefined && t != null) ? (t + " | ") : " ") + a ;
}

// Make Global
module.exports = filters;

