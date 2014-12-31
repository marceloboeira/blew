/**
 * Angular Lodash Service
 *
 * @param  {[type]}
 * @return {[type]}
 */
var lodash = angular.module('lodash', []);

lodash.factory('lodash', function() {
	return window._;
});
