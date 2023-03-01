const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const corsHandler = require('cors')({ origin: true });


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
//const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use((_req, _res, next) => {
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

app.post("/callback-bai-paga", jsonParser, async (req, res) => {
	corsHandler(req, res, async () => {
		
		const body = req.body;
		res.json(body);

	});
});

app.listen('5000', () => console.log('Server is running'));