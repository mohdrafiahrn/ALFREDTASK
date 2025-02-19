import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const QuizPage = () => {
    const { level } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [showAnswer, setShowAnswer] = useState(false);

   
    useEffect(() => {
        axios.get(`http://localhost:5000/api/flashcards/level/${level}`)
            .then((response) => setQuestions(response.data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, [level]);

    
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            
            if (!selectedAnswer) {
                setScore((prevScore) => prevScore - 5);
            }
            handleNext();
        }
    }, [timer]);

    
    const handleSubmit = () => {
        if (!selectedAnswer) return;

        const correctAnswer = questions[currentIndex].correctAnswer;

        if (selectedAnswer === correctAnswer) {
            setScore((prevScore) => prevScore + 10); 
        } else {
            setScore((prevScore) => prevScore - 5);
        }

        setShowAnswer(true);

       
        setTimeout(() => {
            handleNext();
        }, 2000);
    };

 
    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
            setShowAnswer(false);
            setTimer(30);
        } else {
            setTimeout(completeQuiz, 1000);
        }
    };

    const completeQuiz = async () => {
        const playerName = await Swal.fire({
            title: "🎉 Quiz Completed!",
            text: "Enter your name for the leaderboard:",
            input: "text",
            inputPlaceholder: "Enter your name",
            showCancelButton: true,
            confirmButtonText: "Submit",
        });
    
        if (!playerName.value) return;
    
        try {
            await axios.post("http://localhost:5000/api/flashcards/scores", {
                name: playerName.value,
                score: score
            });
    
            console.log("Score saved to DB:", score);
            
            Swal.fire({
                title: "Score Submitted!",
                text: `Your Final Score: ${score}`,
                icon: "success",
                confirmButtonText: "View Leaderboard"
            }).then(() => {
                navigate("/leaderboard");
            });
    
        } catch (error) {
            console.error("Error saving score:", error);
            Swal.fire("Error", "Failed to save score", "error");
        }
    };
    
    const back_to_card_page = () => {
        navigate("/");
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 w-307">
            
            <div className="w-full max-w-lg bg-gray-300 h-3 rounded-full mb-4">
                <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
            </div>

            
            {questions.length > 0 ? (
                <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-lg text-center">
                    <h2 className="text-xl font-bold text-blue-600">
                        {questions[currentIndex].question}
                    </h2>

                    
                    <div className="mt-4 space-y-2">
                        {questions[currentIndex].options.map((option, index) => (
                            <label key={index} className="block bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-300">
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    className="mr-2"
                                    checked={selectedAnswer === option}
                                    onChange={() => setSelectedAnswer(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>

                    
                    <div className="mt-4 flex justify-between">
                        <p className="text-red-500 font-bold">⏳ Time Left: {timer}s</p>
                        <p className="text-green-600 font-bold">🏆 Score: {score}</p>
                    </div>

        
                    <div className="mt-4 space-x-2">
                        <button
                            style={{ backgroundColor: "green" }}
                            onClick={handleSubmit}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-20"
                        >
                            Submit
                        </button>
                        <button
                            style={{ backgroundColor: "red" }}
                            onClick={handleNext}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-20"
                        >
                            Next
                        </button>
                        <button
                            style={{ backgroundColor: "yellow" }}
                            onClick={() => setShowAnswer(true)}
                            className="bg-red-500 text-black px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Show Answer
                        </button>

                        <button
                            style={{ backgroundColor: "black" }}
                            onClick={back_to_card_page}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                            Back
                        </button>
                    </div>

                
                    {showAnswer && (
                        <p className={`mt-4 font-semibold ${selectedAnswer === questions[currentIndex].correctAnswer ? "text-green-600" : "text-red-600"}`}>
                            ✅ Correct Answer: {questions[currentIndex].correctAnswer}
                        </p>
                    )}
                </div>
            ) : (
                <p className="text-lg text-gray-600">Loading Questions...</p>
            )}
        </div>
    );
};

export default QuizPage;
