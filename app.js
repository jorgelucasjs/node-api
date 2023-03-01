const express = require("express");
const app = express();
const corsHandler = require('cors')({ origin: true });


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

app.post("/callback-bai-paga", async (req, res) => {
	corsHandler(req, res, async () => {
		
		const body = req.body;

		console.log('TESTE DE API, POST');

		res.json(body);

	});
});

app.listen('5000', () => console.log('Server is running'));