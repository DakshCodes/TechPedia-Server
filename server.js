const express = require('express')

const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(express.json());

require('dotenv').config(); //it is neccessary to get the env variables from .env

const dbConfig = require("./config/dbConfig");

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

const usersRoute = require("./routes/userRoutes") 
app.use("/api/users", usersRoute);
const blogRoute = require("./routes/blogRoutes") 
app.use("/api/blog", blogRoute);



app.listen(port , ()=> console.log(`Node Js server started at ${port}`))