import express from "express";
const router = express.Router();

router.get("/home", (req, res) => {
    try {
        res.json({
            message: "Welcome, User!",
        });
    } catch (err) {
        console.error(err)
        res.status(400).json({
            error: err,
            status: "failed to retrieve GAMES from the database",
        })
    }
});

export default router;