/** 
 * View Filters
 *
 * @see https://github.com/vimia/blew/issues/23
 */


var filters = require('ejs').filters;
var moment = require('moment');
var timeParser = require('parse-duration');
/** 
 * Apply moment.js at server-side as a  filter
 * 
 * @param d - Dirty Date
 * @return 'x days ago' 
 */
filters.dateFromNow = function(d) {
	return moment(d).fromNow();
},


/** 
 * Date component Generator
 * 
 * @param d - Dirty Date
 * @return '<date source="DirtyDate">x days ago</date>' 
 */
filters.dateComponent = function(d) {
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

/** 
 * Time parsing, '1d 4h' => One day and 4 hours => 24 * 60 ...
 * 
 * @see https://github.com/jkroso/parse-duration#api  
 * @param i - Icon name
 * @param c - adicional classes
 * @return time in ms
 */
filters.parseTime = function(s) {
  		
	// var a = new Date();
	// var b = a.getTime();
	// var c = FilterService.parseTime('1d');
	// var d = b + c;
	// var e = new Date(d);
	// console.log(a);
	// console.log(b);
	// console.log(c);
	// console.log(d);
	// console.log(e);
	// console.log(e);

	return timeParser(s);
}

// Make Global
module.exports = filters;

