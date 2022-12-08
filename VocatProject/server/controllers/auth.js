import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
const { User } = require("../models/User");

// sendgrid
require("dotenv").config({ silent: true });
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_KEY);


export const signup = async (req, res) => {
    console.log("Signup Hit");
    try {
        // validation
        const dateObj = new Date()
        const year = dateObj.getFullYear()
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2)
        const date = ("0" + dateObj.getDate()).slice(-2)
        const { name, email, password } = req.body;
        console.log(name, email, password);
        if (!name) {
            return res.json({
                error: "Name is required",
            });
        }
        if (!email) {
            return res.json({
                error: "Email is required",
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be 6 characters long",
            });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is taken",
            });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        try {
            const user = await new User({
                username: name,
                email,
                password: hashedPassword,
                joinDate: year + "-" + month + "-" + date,
            }).save();
            // create signed token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            //   console.log(user);
            const { password, ...rest } = user._doc;
            return res.json({
                token,
                user: rest,
            });
        } catch (err) {
            console.log("ERROR 1", err);
        }
    } catch (err) {
        console.log("ERROR 2", err);
    }
};

export const signin = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password, date } = req.body;
        console.log(date);
        // check if our db has user with that email
        let user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "No user found",
            });
        }
        // check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
                error: "Wrong password",
            });
        }
        // create signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        user.secret = undefined;
        return res.json({
            token,
            user: {
                ...user._doc,
                lastLogInDate: user.lastLogInDate.concat(date),
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
};

export const updateUser = async (req, res) => {
    console.log("Updating User");
    try {
        const { user } = req.body;
        if (!user._id) {
            return res.json({
                error: "User object not given.",
            });
        }
        const existingUser = await User.findOne({ _id: user._id });
        if (existingUser) {
            await User.updateOne({ _id: user._id }, user);
            return res.json({
                success: "User updated in database.",
            });
        } else {
            return res.json({
                error: "User not in database.",
            });
        }
    } catch (err) {
        console.log(err);
    }
};