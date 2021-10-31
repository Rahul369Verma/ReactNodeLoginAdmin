const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
import jwt from "jsonwebtoken"
import { comparePassword, hashPassword } from "../utils/auth.js"
require("../models/User")

const User = mongoose.model('use')

const TMaxAge = 1000 * 60 * 1
const TExpire = "1m"
const RTMaxAge = 1000 * 60 * 10
const RTExpire = "5m"


export const register = (req, res) => {
	try {
		const { name, email } = req.body
		if (!name || name.length < 3) {
			return res.send({ register: false, message: "Name is required or too short" })
		}
		if (!req.body.password || req.body.password.length < 6) {
			return res.send({ register: false, message: "password should be at least 6 characters long" })
		}
		if (!email) return res.send({ register: false, message: "Email is Required" })
		User.findOne({ email }, async (err, db_user) => {
			console.log(db_user);
			if (!db_user) {
				req.body.password = await hashPassword(req.body.password)
				const data = {
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					type: req.body.type
				}
				new User(data).save((err, savedUser) => {
					if (err) {
						console.log(err);
						return res.send({ register: false, message: err })
					}
					if (savedUser) return res.send({ register: true, message: "Registered Successfully" })
				})
			} else if (err) {
				console.log(err);
				return res.send({ register: false, message: err })
			} else {
				return res.send({ register: false, message: "Email is already Taken" })
			}
		})
	} catch (err) {
		return res.status(400).send("Error Try Again")
	}
}

export const login = (req, res) => {
	User.findOne({ email: req.body.email }, (err, data) => {
		if (!data) {
			res.status(401).send("user Not Found")
		} else if (err) {
			return res.status(401).send("try again database error")
		} else {
			try {
				comparePassword(req.body.password, data.password, async (err, result) => {

					data.password = null
					if (err) {
						return res.status(401).send("can't compare password")
					} else if (result === true) {
						const token = await jwt.sign({ _id: data._id }, process.env.JWT_SECRET_ACCESS_TOKEN, {
							expiresIn: TExpire
						})
						const refreshToken = await jwt.sign({ _id: data._id }, process.env.JWT_SECRET_REFRESH_TOKEN, {
							expiresIn: RTExpire
						})
						console.log("login success", result)
						// res.setHeader("Access-Control-Allow-Credentials", true)

						res.cookie("refreshToken", "Bearer " + refreshToken, {
							httpOnly: true,
							maxAge: RTMaxAge,
							// path: "refreshToken"
						})
						res.cookie("token", "Bearer " + token, {
							httpOnly: true,
							maxAge: TMaxAge,
						})
						res.send({
							username: data.name, email: data.email, type: data.type
						})
					} else {
						res.status(401).send("Wrong Password")
					}
				})
			} catch (error) {
				return res.status(401).send("try again")
			}
		}
	})
}

export const logout = (req, res) => {
	console.log("helllooooo")
	res.clearCookie("refreshToken")
	res.clearCookie("token")
	res.send(true)
}

export const userData = (req, res) => {
	console.log(req.jwtData);
	User.findOne({ _id: req.jwtData._id }, (err, data) => {
		if (err) {
			res.status(404).send("user not found")
		}
		res.send({
			username: data.name, email: data.email, type: data.type
		})
	})

}


export const newCookies = (req, res) => {
	console.log("RTData " + req.jwtData);
	User.findOne({ _id: req.jwtData._id }, async (err, data) => {
		if (err) {
			res.status(404).send("user not found in database")
		}
		const token = await jwt.sign({ _id: req.jwtData._id }, process.env.JWT_SECRET_ACCESS_TOKEN, {
			expiresIn: TExpire
		})
		const refreshToken = await jwt.sign({ _id: req.jwtData._id }, process.env.JWT_SECRET_REFRESH_TOKEN, {
			expiresIn: RTExpire
		})
		console.log("login success " + token)

		res.cookie("refreshToken", "Bearer " + refreshToken, {
			httpOnly: true,
			maxAge: RTMaxAge,
			// path: "/refreshToken"
		})
		res.cookie("token", "Bearer " + token, {
			httpOnly: true,
			maxAge: TMaxAge,
		})
		res.send({
			username: data.name, email: data.email, type: data.type
		})
	})

}



