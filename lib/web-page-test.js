'use strict';

var webpagetest = require('webpagetest'),
	ora         = require('ora');

var webPageTest = module.exports = {};

webPageTest.run = function(options) {

	if ( ! options.url ) {
		console.error('Please specify a URL\n')
		return;
	}

	var wpt = new webpagetest();

	var spinner = ora('Running test. . .').start();

	var test = wpt.runTest(options.url, options, function(err, data) {
		spinner.stop();
		options.callback(err, data);
	});
}