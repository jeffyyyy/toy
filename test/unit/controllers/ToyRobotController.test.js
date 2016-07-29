var request = require('supertest');

describe("Toy Robot Simulator", function() {
	it("Simulator should not start with a MOVE command", function(done) {
		request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'move'} })
        .expect({error: "No current position, please use valid PLACE command first"}, done);
	});

	it("Simulator should not start with a LEFT command", function(done) {
		request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'left'} })
        .expect({error: "No current position, please use valid PLACE command first"}, done);
	});

	it("Simulator should not start with a RIGHT command", function(done) {
		request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'right'} })
        .expect({error: "No current position, please use valid PLACE command first"}, done);
	});

	it("Invalid PLACE command, x value is negative integer", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: -1, y: 1, f: 'N'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Invalid PLACE command, x value is larger than boundary length 4", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: 5, y: 1, f: 'N'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Invalid PLACE command, x value is float", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: 3.2, y: 1, f: 'N'} })
        .expect({error: "Command input not valid, either x or y or direction or type undefined"}, done);
	});

	it("Invalid PLACE command, x value is not number", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: "test", y: 1, f: 'N'} })
        .expect({error: "Command input not valid, either x or y or direction or type undefined"}, done);
	});

	it("Invalid PLACE command, y value is negative integer", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: 0, y: -3, f: 'N'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Invalid PLACE command, y value is larger than boundary length 4", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: 2, y: 6, f: 'N'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Invalid PLACE command, y value is float", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: 3, y: 1.1, f: 'N'} })
        .expect({error: "Command input not valid, either x or y or direction or type undefined"}, done);
	});

	it("Invalid PLACE command, y value is not number", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: 3, y: "testtest", f: 'N'} })
        .expect({error: "Command input not valid, either x or y or direction or type undefined"}, done);
	});

	it("Invalid PLACE command, facing direction not set", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: 2, y: 6, f: ''} })
        .expect({error: "Command input not valid, either x or y or direction or type undefined"}, done);
	});

	it("Invalid PLACE command, facing direction invalid", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ commandInput: {type: 'place', x: 2, y: 6, f: 'NN'} })
        .expect({error: "Command input not valid, either x or y or direction or type undefined"}, done);
	});

	it("Given current position set, test MOVE command at position (0,0), facing south", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:0,y:0,f:'S'}, commandInput: {type: 'move'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Given current position set, test MOVE command at position (0,0), facing north", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:0,y:0,f:'N'}, commandInput: {type: 'move'} })
        .expect({x: 0, y: 1, f: 'N'}, done);
	});

	it("Given current position set, test MOVE command at position (0,0), facing east", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:0,y:0,f:'E'}, commandInput: {type: 'move'} })
        .expect({x: 1, y: 0, f: 'E'}, done);
	});

	it("Given current position set, test MOVE command at position (0,0), facing west", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:0,y:0,f:'W'}, commandInput: {type: 'move'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Given current position set, test MOVE command at position (4,4), facing south", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:4,y:4,f:'S'}, commandInput: {type: 'move'} })
        .expect({x:4,y:3,f:'S'}, done);
	});

	it("Given current position set, test MOVE command at position (4,4), facing north", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:4,y:4,f:'N'}, commandInput: {type: 'move'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Given current position set, test MOVE command at position (4,4), facing east", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:4,y:4,f:'E'}, commandInput: {type: 'move'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Given current position set, test MOVE command at position (4,4), facing west", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:4,y:4,f:'W'}, commandInput: {type: 'move'} })
        .expect({x:3,y:4,f:'W'}, done);
	});

	it("Given current position set, test MOVE command at position (0,4), facing south", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:0,y:4,f:'S'}, commandInput: {type: 'move'} })
        .expect({x:0,y:3,f:'S'}, done);
	});

	it("Given current position set, test MOVE command at position (0,4), facing north", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:0,y:4,f:'N'}, commandInput: {type: 'move'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Given current position set, test MOVE command at position (0,4), facing east", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:0,y:4,f:'E'}, commandInput: {type: 'move'} })
        .expect({x:1,y:4,f:'E'}, done);
	});

	it("Given current position set, test MOVE command at position (0,4), facing west", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:0,y:4,f:'W'}, commandInput: {type: 'move'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Given current position set, test MOVE command at position (4,0), facing south", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:4,y:0,f:'S'}, commandInput: {type: 'move'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Given current position set, test MOVE command at position (4,0), facing north", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:4,y:0,f:'N'}, commandInput: {type: 'move'} })
        .expect({x: 4, y: 1, f: 'N'}, done);
	});

	it("Given current position set, test MOVE command at position (4,0), facing east", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:4,y:0,f:'E'}, commandInput: {type: 'move'} })
        .expect({error: "Out of boundary"}, done);
	});

	it("Given current position set, test MOVE command at position (4,0), facing west", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:4,y:0,f:'W'}, commandInput: {type: 'move'} })
        .expect({x:3,y:0,f:'W'}, done);
	});

	it("Given current position set, test LEFT command at position (2,3), facing west", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:2,y:3,f:'W'}, commandInput: {type: 'left'} })
        .expect({x:2,y:3,f:'S'}, done);
	});

	it("Given current position set, test LEFT command at position (2,3), facing south", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:2,y:3,f:'S'}, commandInput: {type: 'left'} })
        .expect({x:2,y:3,f:'E'}, done);
	});

	it("Given current position set, test RIGHT command at position (2,3), facing west", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:2,y:3,f:'W'}, commandInput: {type: 'right'} })
        .expect({x:2,y:3,f:'N'}, done);
	});

	it("Given current position set, test RIGHT command at position (2,3), facing north", function(done) {
        request(sails.hooks.http.app)
        .post('/api/handleNextMove')
        .send({ currentPosition: {x:2,y:3,f:'N'}, commandInput: {type: 'right'} })
        .expect({x:2,y:3,f:'E'}, done);
	});
});