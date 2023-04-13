const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const corsHandler = require('cors')({ origin: true });
var https = require('follow-redirects').https;


//app.use(bodyParser.text({ type: 'application/xml' }));
app.use(cors());

app.use(bodyParser.json());

app.use(function(_req, _res, next) {
	next();
});

app.get("/test", async (req, res) => {
	corsHandler(req, res, async () => {

		const body = req.body;

		const data = {
			hello: 'Hello USER'
		}

		console.log(data);

		res.json(data);

	});
});

app.post("/callback-bai-paga", (req, res) => {

	corsHandler(req, res, () => {

		const xmlData = req.body;

		console.log(xmlData);
		// Converte o XML para um objeto JavaScript
		//const jsonData = fastXmlParser.parse(xmlData);

		// Faça o processamento desejado com o objeto jsonData

		// Converte o objeto JavaScript de volta para XML
		//const xmlResponse = fastXmlParser.parse(jsonData, { ignoreAttributes: false });

		// Define o cabeçalho Content-Type para application/xml
		res.setHeader('Content-Type', 'application/xml');
		// Envia a resposta como XML
		res.send(xmlData);

	});
});



app.post('/api/payment', async (req, res) => {

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

		console.log('postData', postData);

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

				const obj = JSON.parse(result);
				const confirmationUrl = obj.confirmationUrl;

				console.log(result);
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

app.listen('5000', () => console.log('Server is running'));