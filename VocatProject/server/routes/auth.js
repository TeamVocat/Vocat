import express from "express";
var mongoose = require('mongoose');
const router = express();
const { EnglishVocabWord } = require("../models/VocabWord");
const { User } = require("../models/User");

// controllers
const { signup, signin } = require("../controllers/auth");

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

router.get('/newVocab', async (req, res) => {
  if (req.query.id){
    await User.findOne({id:`new ObjectId("${req.query.id}")`}).exec(function (err, result) {
      const returnWords = []
      EnglishVocabWord.findOne().skip(req.query.progress).exec(
          function (err, wordResult) {
              // words in order
              res.json({
                  word: wordResult,
                  status: "Success"
              });
      })
    })
  }
  else {
    try {
        await EnglishVocabWord.count()
            .exec(async function (err, count) {
                // Get a random entry
                var random = Math.floor(Math.random() * count)
                // Again query all words but only fetch one offset by our random #
                EnglishVocabWord.findOne().skip(random).exec(
                    function (err, result) {
                        // Tada! random word
                        //console.log(result);
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
  }
})

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
