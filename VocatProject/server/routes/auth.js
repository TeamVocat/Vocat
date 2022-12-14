import express from "express";
var mongoose = require('mongoose');
const router = express.Router();
const { EnglishVocabWord } = require("../models/VocabWord");
const { User } = require("../models/User");

// controllers
const { signup, signin, updateUser } = require("../controllers/auth");

router.get("/home", (req, res) => {
    try {
        let messages = ["Welcome", "Hello", "Welcome Back", "Let's Study", "Hey There", "You Can Do It"];
        let message = messages[Math.floor(Math.random() * messages.length)];
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

router.post('/newVocab', async (req, res) => {
    // if (req.body.id === "learning") {
    try {
        // await User.findOne({ id: `new ObjectId("${req.query.id}")` }).exec(function (err, result) {
        //     const returnWords = []
        //     EnglishVocabWord.findOne().skip(req.query.progress).exec(
        //         async function (err, wordResult) {
        //             // words in order
        //             res.json({
        //                 word: wordResult,
        //                 status: "Success"
        //             });
        //         })
        // })
        const { wordBank } = req.body;
        console.log(req.body);
        let wordIds;
        if (wordBank.length >= 1) {
            wordIds = wordBank.map(word => word._id);
        };
        const words = await EnglishVocabWord.find({ _id: { $nin: wordIds } });
        var random = Math.floor(Math.random() * words.length)
        // Again query all words but only fetch one offset by our random #
        res.json({
            word: words[random],
            status: "Success"
        });
    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: error,
            status: "Failed to .get NEW VOCAB WORD with id",
        })
    }
    // } else {
    //     try {
    //         await EnglishVocabWord.count()
    //             .exec(async function (err, count) {
    //                 // Get a random entry
    //                 var random = Math.floor(Math.random() * count)
    //                 // Again query all words but only fetch one offset by our random #
    //                 EnglishVocabWord.findOne().skip(random).exec(
    //                     function (err, result) {
    //                         // Tada! random word
    //                         console.log(result);
    //                         res.json({
    //                             word: result,
    //                             status: "Success"
    //                         });
    //                     })
    //             });
    //     } catch (error) {
    //         console.error(error)
    //         res.status(400).json({
    //             error: error,
    //             status: "Failed to .get Random vocab word",
    //         })
    //     }
    // }
});

router.get("/getDate", async (req, res) => {
    // console.log(req.body);
    try {
        const dateObj = new Date();
        // const year = dateObj.getFullYear();
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const date = ("0" + dateObj.getDate()).slice(-2);

        res.json({
            obj: {
                date: month + "/" + date,
                numWords: 0,
            }
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