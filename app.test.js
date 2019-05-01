const request = require('supertest');
const app = require('./app.js');

let userid=null;
let sessionid=null;

describe('Test the login process', () => {
	test('GET /pingtest succeeds', () => {
		return request(app)
			.get("/pingtest" )
	.expect(200);
	});
	test('POST /login succeeds', (done) => {
		return request(app)
			.post("/login" ).send({email: "default@default.default", password: "Password"})
			.expect(200)
            .then(response => {
				sessionid=response.body.sessionID;
				userid=response.body.userID;
                done()

		})
	});

});


describe('Test the character info retreival process', () => {
    test('GET /char succeeds', () => {
        return request(app)
            .get("/char/" + sessionid.toString())
            .expect(200);
    });
    test('GET /updatevalues succeeds', () => {
        return request(app)
            .post("/updatevalues/" + userid.toString())
            .send({"Name": "UpdatedName"})
            .expect(200);
    });


});