const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const flashcardRoutes = require("./routes/FlashCard.routes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Stop server if DB connection fails
    });
    app.use("/api/flashcards", flashcardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
