const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const corsHandler = require('cors')({ origin: true });


app.use(bodyParser.text({ type: 'application/xml' }));

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

app.listen('5000', () => console.log('Server is running'));