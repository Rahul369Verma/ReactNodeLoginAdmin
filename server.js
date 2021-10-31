const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

import { first } from "./protected_functions/first"
import { register, login, logout, userData, newCookies } from "./controllers/index.js"
import { verifyToken, refreshToken } from "./middleware/authjwt.js";

const url = 'mongodb://127.0.0.1:27017/mynew' //mynew is database name
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.once('open', _ => {
	console.log('Database connected:', url)
})
db.on('error', err => {
	console.error('connection error:', err)
})

var corsOptions = {
	credentials: true,
	origin: "http://localhost:3006"
}

const app = express();
app.use(cors(corsOptions)) //for handling cors origin handling
app.use(express.json()) // to handle coming json data from client without body-parser
app.use(morgan("dev")) // to show each end point request in console log
app.use(cookieParser());




app.get("/refreshToken", refreshToken, newCookies)
app.post("/register", register)
app.post("/login", login)
app.get("/userData", verifyToken, userData)
app.get("/logout", logout)
app.get("/user", verifyToken, first)


app.listen(5000, console.log("server running on port 5000"))