const express = require('express');
const app = express();
const nconf = require('nconf');
require("./startup/startup.config")();

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    if (req.method !== "OPTIONS") console.log(req.method, ":", req.originalUrl);
    next();
});

//* DB connection
let promise = new Promise((resolve, reject) => {require("./startup/startup.db")(resolve, reject)});

promise.then((res) => {
    //*imports
    const getStocks = require("./routes/routes.stock")
    const auth = require("./routes/routes.auth")

    //* Routes
    app.use('/api/stocks', getStocks);
    app.use('/api/auth', auth);
    app.use('/api**', (req, res, next) => res.status(404).send("Sorry can't find that!"));
}).catch((err) => {
    console.log("Error in connecting to db:: ", err);
});

let port = nconf.get("port") || 3000;
app.listen(port,()=>{
    console.log(`listening in port ${port}`)
})