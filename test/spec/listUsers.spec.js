(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('../../js/stardog.js'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['stardog'], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.Stardog);
    }
}(this, function (Stardog) {

	describe ("List Users Test Suite", function() {
		var conn;

		beforeEach(function() {
			conn = new Stardog.Connection();
			conn.setEndpoint("http://localhost:5822/");
			conn.setCredentials("admin", "admin");
		});

		afterEach(function() {
			conn = null;
		});

		it ("should return a list of current registered users in the system.", function (done) {

			conn.listUsers(function (data, response) {
				expect(response.statusCode).toBe(200);

				expect(data.users).toBeDefined();
				expect(data.users).not.toBeNull();
				expect(data.users.length).toBeGreaterThan(0);
				expect(data.users).toContain('admin');

				done();
			});
		});
	});

    // Just return a value to define the module export.
    return {};
}));
