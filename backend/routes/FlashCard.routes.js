const express = require("express");
const router = express.Router();
const FlashCard = require("../models/FlashCard.model");
const Score = require("../models/Score.model");

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        if (Array.isArray(data)) {
            const flashcards = await FlashCard.insertMany(data);
            res.status(201).json({ message: "Multiple flashcards added successfully!", flashcards });
        } else {
            const newFlashcard = new FlashCard(data);
            await newFlashcard.save();
            res.status(201).json({ message: "Flashcard added successfully!", flashcard: newFlashcard });
        }
    } catch (error) {
        res.status(500).json({ message: "Error adding flashcard", error });
    }
});


router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;
        const flashcards = await FlashCard.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flashcards", error });
    }
});


router.get("/level/:level", async (req, res) => {
    try {
        const { level } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const flashcards = await FlashCard.find({ level: { $regex: new RegExp(`^${level}$`, "i") } })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        if (flashcards.length === 0) {
            return res.status(404).json({ message: "No questions found for this level." });
        }

        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flashcards by level", error });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { correct, ...updatedData } = req.body;

        const flashcard = await FlashCard.findById(id);
        if (!flashcard) return res.status(404).json({ message: "Flashcard not found!" });

        if (correct !== undefined) {
            const nextLevel =
                flashcard.level === "Beginner" ? "Intermediate" :
                flashcard.level === "Intermediate" ? "Advanced" :
                "Advanced";

            flashcard.level = nextLevel;
        } else {
            await FlashCard.findByIdAndUpdate(id, updatedData, { new: true });
        }

        await flashcard.save();
        res.json({ message: "Flashcard updated successfully!", flashcard });

    } catch (error) {
        res.status(500).json({ message: "Error updating flashcard", error });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        await FlashCard.findByIdAndDelete(req.params.id);
        res.json({ message: "Flashcard deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting flashcard", error });
    }
});


router.post("/delete-multiple", async (req, res) => {
    try {
        const { ids } = req.body;
        await FlashCard.deleteMany({ _id: { $in: ids } });

        res.json({ message: `${ids.length} flashcards deleted successfully!` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting multiple flashcards", error });
    }
});


router.get("/scores", async (req, res) => {
    try {
        const topScores = await Score.find().sort({ score: -1 }).limit(10);
        res.json(topScores);
    } catch (error) {
        res.status(500).json({ message: "Error fetching scores", error });
    }
});

router.post("/scores", async (req, res) => {
    try {
        const { name, score } = req.body;

        if (!name || score === undefined) {
            return res.status(400).json({ message: "Name and score are required!" });
        }

        const newScore = new Score({ name, score });
        await newScore.save();

        res.status(201).json({ message: "Score added successfully!", newScore });
    } catch (error) {
        res.status(500).json({ message: "Error saving score", error });
    }
});

module.exports = router;
