import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
    const [scores, setScores] = useState([]);


    useEffect(() => {
        axios.get("https://alfredtask-r6pc.onrender.com/api/flashcards/scores")
            .then((response) => setScores(response.data))
            .catch((error) => console.error("Error fetching leaderboard:", error));
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 w-303.5">
            <h2 className="text-3xl font-bold text-blue-600 mb-4 mt-16">🏆 Leaderboard</h2>
            <div className="bg-blue-600 p-6 shadow-lg rounded-lg w-full max-w-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-200">
                            <th className="p-2">Rank</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => (
                            <tr key={index} className="border-t bg-gray-200">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{score.name}</td>
                                <td className="p-2 font-bold">{score.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            
        </div>
    );
};

export default Leaderboard;
