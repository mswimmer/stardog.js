var stardog = require('../js/stardog');
var qs = require('querystring');

// -----------------------------------
// Describes the listDB test methods
// -----------------------------------

describe ("Create a new DB Test Suite", function() {
	var conn;

	beforeEach(function() {
		conn = new stardog.Connection();
		conn.setEndpoint("http://localhost:5822/");
		conn.setCredentials("admin", "admin");
	});

	afterEach(function() {
		conn = null;
	});

	it ("should not be able to create a new db with the name of an existing DB", function (done) {
		var options = {
			"index.type" : "disk"
		}

		var filesArr = [];

		conn.createDB('nodeDB', options, filesArr, function (data, response) {
			expect(response.statusCode).toBe(409);

			done();
		});
	});

	it ("should create a new empty DB, returning 201", function (done) {
		var options = {
			"search.enabled" : true
		};

		var filesArr = [];

		// filesArr.push({
		// 	"name" : "api_tests.nt"
		// });
		
		conn.createDB('nodeDB2', options, filesArr, function (data, response) {
			expect(response.statusCode).toBe(201);
			// console.log(data);

			if (response.statusCode === 201) {
				// clean created DB after we know it was created
				conn.dropDB('nodeDB2', function (data2, response2) {
					expect(response2.statusCode).toBe(200);

					done();
				});
			}
		});

	});

	// it ("should create a new DB with data, returning 201", function (done) {
	// 	var options = {
	// 		"search.enabled" : true
	// 	};

	// 	var filesArr = [];
	// 	filesArr.push({
	// 		"name" : "api_tests.nt"
	// 	});
		
	// 	conn.createDB('newNodeDB', options, filesArr, function (data, response) {
	// 		expect(response.statusCode).toBe(201);
	// 		console.log(data);

	// 		if (response.statusCode === 201) {
	// 			conn.dropDB('newNodeDB', function (data2, response2) {
	// 				expect(response2.statusCode).toBe(200);

	// 				done();
	// 			});
	// 		}
	// 		else {
	// 			// console.log(data);
	// 			done();
	// 		}
	// 	}, 'data/api_tests.nt');

	// });

});