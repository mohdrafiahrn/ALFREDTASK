const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
    question : {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required : true
    },
    correctAnswer: {
        type: String,
        required: true 
    },
    level: { 
        type: String, 
        enum: ["Beginner", "Intermediate", "Advanced"], 
        required: true 
    }, 
    timer: { 
        type: Number, 
        default: 30 
    }, 
    score: { 
        type: Number, 
        default: 10 
    } 
})

const FlashCard = mongoose.model("FlashCard", flashcardSchema);

module.exports = FlashCard; 