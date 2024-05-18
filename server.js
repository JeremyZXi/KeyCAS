const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/save', (req, res) => {
    const { html, css } = req.body;
    fs.writeFileSync('content.json', JSON.stringify({ html, css }));
    res.json({ success: true });
});

app.get('/load', (req, res) => {
    if (fs.existsSync('content.json')) {
        const content = fs.readFileSync('content.json', 'utf8');
        res.json({ success: true, ...JSON.parse(content) });
    } else {
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});