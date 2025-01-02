const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
dotenv.config();        
const port = process.env.PORT || 3000;




mongoose.connect(process.env.DBURL)
.then(() => console.log("DB Connected..!"))

app.use('/',userRouter);
app.get('/', (req, res) => {
    res.send("working...!");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})