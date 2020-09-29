const express = require('express');
const app = express();
require('dotenv').config(); //penulisan untuk dotenv

const PORT = process.env.PORT || 3000; //penulisan untuk .env file

const router = require('./routes/index');

// Middlewares
// app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);  // mengambil dari ./routes/index.js

app.listen(PORT, () => {
   console.log('app.js is running at port : ' + PORT);
})
