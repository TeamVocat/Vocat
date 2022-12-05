import express from "express";
var mongoose = require('mongoose');
const router = express.Router();
const { EnglishVocabWord } = require("../models/VocabWord");

// controllers
const { signup, signin, updateUser } = require("../controllers/auth");

router.get("/home", (req, res) => {
    try {
        let message = "Welcome";
        res.json({
            message: message,
            status: "Success"
        });
    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: error,
            status: "Failed to .get HOME",
        })
    }
});

router.get("/newVocab", async (req, res) => {
    try {
        await EnglishVocabWord.count()
            .exec(async function (err, count) {
                // Get a random entry
                var random = Math.floor(Math.random() * count)
                // Again query all words but only fetch one offset by our random #
                EnglishVocabWord.findOne().skip(random).exec(
                    function (err, result) {
                        // Tada! random word
                        console.log(result);
                        res.json({
                            word: result,
                            status: "Success"
                        });
                    })
            });
    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: error,
            status: "Failed to .get NEW VOCAB WORD",
        })
    }
});

router.get("/getDate", async (req, res) => {
    // console.log(req.body);
    try {
        const dateObj = new Date();
        const year = dateObj.getFullYear();
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const date = ("0" + dateObj.getDate()).slice(-2);

        res.json({
            currentDate: month + "/" + date + "/" + year,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/updateUser", updateUser);

export default router;