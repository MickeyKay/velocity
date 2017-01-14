'use strict';

var RESULTS_DIR = './results';

var wpt        = require('./web-page-test'),
	dateFormat = require('dateformat'),
	writeFile  = require('write'),
	parse      = require('url-parse'),
	slug       = require('slug'),
	sanitize   = require("sanitize-filename");

var velocity = module.exports = {};

velocity.run = function(options) {

	var printTestResults = function(err, data) {

		if (err) {
			console.error( err.statusText );
			return err;
		}

		var file = velocity.getFilePath(options.url, 'web-page-test');
		data = JSON.stringify(data);

		velocity.saveResult( data, options.url, 'web-page-test');
		console.log('\nSaved result to ' + file + '\n');
	}

	var options = {
		url: 'https://twitter.com/marcelduran',
		key: 'A.44e5328c52f8cc5db1b3cc1f22211cbc',
		runs: 1,
		pollResults: 10,
		callback: printTestResults
	};

	wpt.run(options);
};

velocity.saveResult = function( result, url, testType ) {

	var file = velocity.getFilePath(url, testType);

	writeFile(file, result, function(err) {
		if (err) {
			console.log(err);
		}
	});
}

velocity.getFilePath = function(url, testType) {

	var parsedUrl = parse(url);
	var urlString = parsedUrl.hostname + '/' + parsedUrl.pathname;

	var fileDir = RESULTS_DIR + '/' + testType + '/' + urlString;
	var date    = dateFormat(new Date(), "yy-mm-dd-HH-MM-ss");
	var file    = fileDir + '/' + 	date + '.txt';

	return file;
}