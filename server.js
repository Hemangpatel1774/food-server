const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();        
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })    


app.get('/', (req, res) => {
    res.send(process.env.DBURL);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})