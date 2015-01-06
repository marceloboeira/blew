'use strict';
var util = require('util');

describe('Auth', function () {
	describe('Login scenarios', function () {
   	var email;
   	var password;
   	var loginButton;

		/**
		 *
		 */
		it('should login user with valid credentials, redirect to member homepage', function () {
			browser.get("/login").then(function() {
				email = element(by.id('InputUsername'));
				password =   element(by.id('InputPassword'));
				loginButton = element(by.className('btn-success'));

				//send the credentials and click to login
				email.sendKeys('user@email.com');
				password.sendKeys('someuserpassword');
				loginButton.click();
			});
		});

		it('then ensure user is logged in', function () {
			/**
			 * here find an element on the page that only authenticated
			 * users see, such as the logged in Username element on the top nav
			 * AND The element must be displayed on the page.
			 **/
			element(by.id('currentUserMenu')).then(function (usernameelement) {
				expect(usernameelement.isDisplayed()).toBe(true);
				expect(usernameelement.getText()).toEqual('Oscar');
			});
    });
 	});

	/**
	 * Let's ignore these scenarios for now by marking it with 'xdescribe'
	 */
	xdescribe('Signup scenarios', function () {
		var email;
		var password;
		var loginButton;

		it('should create new account successfully', function () {

		});
  });
});
