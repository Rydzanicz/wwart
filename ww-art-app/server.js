const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/ww-art-app/browser')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/ww-art-app/browser', 'index.html'));
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
});
