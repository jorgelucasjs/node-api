const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var https = require('follow-redirects').https;
const app = express();

//app.use(express.json());

app.use(cors());

app.use(bodyParser.json());

app.use(function(_req, _res, next) {
	next();
});

/* app.get('/api/transaction', async (req, res) => {
	try {
		const todos = {
			name: 'Jorge Dark',
			job: 'Javascript fullstack developer'
		};
		res.json({ message: 'Todo created successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
}); */

app.post('/api/payment', async (req, res) => {

	console.log('start ===> ', req.body)

	try {

		const apiKey = req.headers['x-mp-apikey'];
		const authToken = req.headers['x-mp-authenticationtoken'];	
		const username = req.headers['x-mp-acceptancepointusername'];
		const password = req.headers['x-mp-acceptancepointpassword'];
		const endPoint = req.headers['end-point'];	
		const postData = JSON.stringify(req.body);
		const string = endPoint;
		const index = string.indexOf('/QUAMDW-3G/');
		const path = index !== -1 ? string.substring(index) : '';

		var options = {
			'method': 'POST',
			'hostname': 'ib.bancobai.ao',
			'path': path,
			'headers': {
				'X-MP-AuthenticationToken': authToken,
				'X-MP-AcceptancePointUsername': username,
				'X-MP-AcceptancePointPassword': password,
				'X-MP-ApiKey': apiKey,
				'Content-Type': 'application/json'
			},
			'maxRedirects': 20
		};

		var req = https.request(options, function (response) {
			var chunks = [];

			response.on("data", function (chunk) {
				chunks.push(chunk);
			});

			response.on("end", function (chunk) {
				var body = Buffer.concat(chunks);
				const result = body.toString();
				console.log(result);
				const obj = JSON.parse(result);
				const confirmationUrl = obj.confirmationUrl;

				res.json({confirmationUrl: confirmationUrl});
			});

			response.on("error", function (error) {
				console.error(error);
				console.log(error);
			});
		});

		req.write(postData);
		req.end(); 

	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});






