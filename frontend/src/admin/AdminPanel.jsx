import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [editingFlashcard, setEditingFlashcard] = useState(null);
    const [newFlashcard, setNewFlashcard] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", level: "Beginner" });
    const [jsonInput, setJsonInput] = useState(""); 
    const questionInputRef = useRef(null);
    const formRef = useRef(null);
    useEffect(() => {
        fetchFlashcards();
    }, []);
    const fetchFlashcards = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/flashcards");
            setFlashcards(response.data);
        } catch (error) {
            console.error("Error fetching flashcards:", error);
        }
    };
    const handleInputChange = (e, index) => {
        const updatedOptions = [...newFlashcard.options];
        updatedOptions[index] = e.target.value;
        setNewFlashcard({ ...newFlashcard, options: updatedOptions });
    };
    const addFlashcard = async () => {
        try {
            await axios.post("http://localhost:5000/api/flashcards", newFlashcard);
            fetchFlashcards();
            setNewFlashcard({ question: "", options: ["", "", "", ""], correctAnswer: "", level: "Beginner" });
        } catch (error) {
            console.error("Error adding flashcard:", error);
        }
    };
    const addBulkFlashcards = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);

            await axios.post("http://localhost:5000/api/flashcards", parsedData);
            fetchFlashcards();
            setJsonInput(""); 
            alert("Multiple questions added successfully!");
        } catch (error) {
            alert("Invalid JSON format! Please check your input.");
            console.error("Error:", error);
        }
    };
    const editFlashcard = (flashcard) => {
        setEditingFlashcard(flashcard);
        setNewFlashcard({
            question: flashcard.question,
            options: flashcard.options,
            correctAnswer: flashcard.correctAnswer,
            level: flashcard.level
        });

    
        setTimeout(() => {
            if (questionInputRef.current) {
                questionInputRef.current.focus();
            }
        }, 100);

        
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const updateFlashcard = async () => {
        if (!editingFlashcard) return;
        try {
            await axios.put(`http://localhost:5000/api/flashcards/${editingFlashcard._id}`, newFlashcard);
            fetchFlashcards();
            setEditingFlashcard(null);
            setNewFlashcard({ question: "", options: ["", "", "", ""], correctAnswer: "", level: "Beginner" });
        } catch (error) {
            console.error("Error updating flashcard:", error);
        }
    };

    const deleteFlashcard = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
            fetchFlashcards();
        } catch (error) {
            console.error("Error deleting flashcard:", error);
        }
    };

    return (
        <div className="items-center justify-center min-h-screen bg-gray-100 p-6 w-304">
            <h2 className="text-3xl font-bold text-blue-600 mb-4 mt-16">📋 Admin Panel - Manage Flashcards</h2>
            <div className="flex justify-center gap-10 ">
                <div ref={formRef} className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-lg h-125">
                    <h3 className="text-xl font-bold mb-4">{editingFlashcard ? "Edit Flashcard" : "Add Flashcard"}</h3>
                    <input
                        ref={questionInputRef}
                        type="text"
                        placeholder="Enter Question"
                        className="w-full border p-2 rounded"
                        value={newFlashcard.question}
                        onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                    />
                    {newFlashcard.options.map((option, index) => (
                        <input key={index} type="text" placeholder={`Option ${index + 1}`} className="w-full border p-2 rounded mt-2" value={option} onChange={(e) => handleInputChange(e, index)} />
                    ))}
                    <input type="text" placeholder="Correct Answer" className="w-full border p-2 rounded mt-2" value={newFlashcard.correctAnswer} onChange={(e) => setNewFlashcard({ ...newFlashcard, correctAnswer: e.target.value })} />
                    <select className="w-full border p-2 rounded mt-2" value={newFlashcard.level} onChange={(e) => setNewFlashcard({ ...newFlashcard, level: e.target.value })}>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    {editingFlashcard ? (
                        <button
                            style={{ backgroundColor: "green" }}
                            className="bg-green-900 hover:bg-black text-white px-4 py-2 rounded mt-4"
                            onClick={updateFlashcard}
                        >
                            Update Flashcard
                        </button>
                    ) : (
                        <button style={{ backgroundColor: "green" }} onClick={addFlashcard} className="bg-green-500 hover:bg-black text-white px-4 py-2 rounded mt-4">
                            Add Flashcard
                        </button>
                    )}
                </div>
                <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md h-125">
                    <h3 className="text-xl font-bold mb-4">Bulk Add (JSON Format)</h3>
                    <textarea
                        className="w-full h-40 border p-2"
                        placeholder={`[
    {"question": "What is 2+2?", "options": ["1", "2", "3", "4"], "correctAnswer": "4", "level": "Beginner"},
    {"question": "What is the capital of France?", "options": ["Rome", "Paris", "London", "Berlin"], "correctAnswer": "Paris", "level": "Intermediate"}
]`}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    ></textarea>
                    <button style={{ backgroundColor: "green" }} onClick={addBulkFlashcards} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Add Multiple Questions
                    </button>
                </div>
        
                <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Existing Flashcards</h3>
                    {flashcards.map((flashcard, index) => (
                        <div key={index} className="border-b pb-2 mb-2">
                            <p className="font-semibold">{flashcard.question}</p>
                            <p className="text-sm text-gray-500">Level: {flashcard.level}</p>
                            <button onClick={() => editFlashcard(flashcard)} className="text-blue-500 mt-2 mr-2">Edit</button>
                            <button onClick={() => deleteFlashcard(flashcard._id)} className="text-red-500 mt-2">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
