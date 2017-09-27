/**
 * Example - This is an example of a module
 * which simply returns a title with a value of
 * 'Example'. This modules returned data can then
 * be accessed by main.js when the dom has full loaded
 * within the jQuery document ready function.
 * @return {object} an object containing properties and
 * methods which can be accessed via the dot notation.
 */
var Example = (function() {
	'use strict'
	var title = 'Example'

	return {
		title: title
	}
})()
