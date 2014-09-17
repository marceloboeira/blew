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
 * Date component Generator
 * 
 * @param d - Dirty Date
 * @return '<date source="DirtyDate">x days ago</date>' 
 */
filters.dateComponent = function(d) {
	var moment = require('moment');
	return '<date source="'+ d +'">' + moment(d).fromNow() +'</date>';
},

/** 
 * Create default title
 * 
 * @param a - to Append Title
 * @param t - to Append Title
 * @return nice pageTitle 
 */
filters.pageTitle = function(a, t) {
	return ((t != undefined && t != null) ? (t + " | ") : " ") + a ;
}

/** 
 * Icon component Generator
 * 
 * @param i - Icon name
 * @param c - adicional classes
 * @return '<i class="fa fa-icon another-class"></i>"
 */
filters.iconComponent = function(i, c) {
	return '<i class="fa fa-'+ i + ' ' + c + '"></i>';
}

// Make Global
module.exports = filters;

