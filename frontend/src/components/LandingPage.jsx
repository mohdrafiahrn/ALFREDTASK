import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    const levels = ["Beginner", "Intermediate", "Advanced"];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-307">
    
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Software Development Quiz</h1>

        
            <p className="text-lg text-gray-700 text-center max-w-md mb-6">
                Test your knowledge in software development! Choose your level and start the quiz.
            </p>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-300 h-50">
                {levels.map((level, index) => (
                    <div 
                        key={index} 
                        className="bg-blue-500 p-6 rounded-lg shadow-md text-center cursor-pointer hover:bg-blue-600 transition"
                        onClick={() => navigate(`/quiz/${level.toLowerCase()}`)}
                    >
                        <h2 className="text-5xl font-semibold text-black">{level}</h2>
                        <p className="text-white mt-2">Start {level} Level Quiz</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
