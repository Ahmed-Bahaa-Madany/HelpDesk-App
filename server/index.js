const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const mongoose = require("mongoose");
const fs = require("fs");
// const hotelsRoutes=require("./routes/hotels");
require("dotenv").config()
const path = require('path')
const port = process.env.PORT
const url = process.env.DATABASE
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

fs.readdirSync("./routes").map((rout) => app.use("/api", require(`./routes/${rout}`)))

// db connection
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true
}).then(() => {
    console.log('Connected to database ')
    app.listen(port, () => {
        console.log("APP IS Running");
    })
})
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
