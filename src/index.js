/**
 * The main class for JelbrekAPI, this is a simple API to get information about a jailbreak!
 * @author ConorTheDev
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var jailbreaks = require('./public/jailbreakInformation.json');

/**
 * Use body-parser in the app
 * @see bodyParser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use ejs to render the frontend
app.set('view engine', 'ejs');

/**
 * Setup routes
 */

app.get('/styles.css', (req, res) => {
	res.send('./public/styles.css');
});

// Show an information page when a GET request is sent to '/'
app.get('/', (req, res) => {
	res.render('index.ejs');
});

// Show a page with the jailbreak information if the jailbreak passed is valid
app.get('/search', (req, res) => {
	var jailbreakName = req.query.name;
	jailbreakName = jailbreakName.toLowerCase();

	if (jailbreaks[jailbreakName] != null) {
		return res.render('info.ejs', { jailbreak: jailbreaks[jailbreakName] });
	} else {
		return res.render('error.ejs');
	}
});

// Show a simple message saying 'Welcome to the JelbrekAPI' when a GET request is sent to '/v1'
app.get('/v1', function(req, res) {
	res.status(200).json({ content: 'Welcome to the JelbrekAPI!' });
});

// Show a list of the compatible jailbreaks when a GET request is sent to '/v1/jailbreaks'
app.get('/v1/jailbreaks', (req, res) => {
	var jailbreakNames = Object.keys(jailbreaks).join(', ');

	res.status(200).json({ content: jailbreakNames });
});

// Get information about a particular jailbreak, or return a 404 when a GET request is sent to '/v1/jailbreak/:name'
app.get('/v1/jailbreak/:name', (req, res) => {
	var jailbreakName = req.params.name;
	jailbreakName = jailbreakName.toLowerCase();

	if (jailbreaks[jailbreakName] != null) {
		res.status(200).json({ content: jailbreaks[jailbreakName] });
	} else {
		res.status(404).json({ content: 'That jailbreak does not exist, Sorry!' });
	}
});

// Start the server on the environment port or 8080!
var server = app.listen(process.env.PORT || 8080, () => {
	console.log(`wen eta? tfp0: 0x${server.address().port}`);
});
