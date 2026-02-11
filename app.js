const express = require('express');
const app = express();
const path = require('path');
app.use('/upload', express.static('upload'));
app.set('view engine', 'ejs');
app.use(express.json()); // for JSON data (from fetch/ajax)
app.use(express.urlencoded({ extended: true })); // for HTML forms

app.set('view engine', 'ejs'); // Make sure EJS is set
app.set('views', path.join(__dirname, 'views')); // optional if views/ is default
// server.js
const productRoutes = require('./routes/products');
app.use('/', productRoutes);

app.use(express.static('public')); // for css, js, images



app.listen(3000, () => console.log('Server running on http://localhost:3000'));
