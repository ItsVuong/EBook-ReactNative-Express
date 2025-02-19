const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors");
const indexRoute = require("./routes/index.route");

//config environment variables
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
//Serve static files
const staticFiles = express.static('public',
  {dotfiles: 'ignore', extensions: ['jpg', 'jpeg', 'png']})
app.use('/img', staticFiles)

//Use route so that clients can call apis
app.use(indexRoute)

//connect to database
mongoose.connect(process.env.MONGODB_KEY, {dbName: process.env.DBNAME})
  .then(() => console.log('Connected to database'))
  .catch((e) => {console.log(e)})

//connect to database
app.listen(PORT, () => {
    console.log('App running on port ' + PORT)
});
