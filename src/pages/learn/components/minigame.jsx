import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const wordList = [
    { word: "pedestrian", hint: "A person walking on the road" },
    { word: "traffic jam", hint: "When vehicles cannot move" },
    { word: "passenger", hint: "A person traveling in a vehicle" },
    { word: "seat belt", hint: "Safety device in cars" },
    { word: "bumpy", hint: "An uneven or rough road" },
];

const Game = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [maxGuesses, setMaxGuesses] = useState(6);
    const [inputValue, setInputValue] = useState("");
    const [gameCompleted, setGameCompleted] = useState(false);

    const { word, hint } = wordList[currentWordIndex];

    const navigate = useNavigate();

    // Hàm đọc đoạn hint
    const speakHint = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        speakHint(hint);
    }, [hint]);

    const resetCurrentWord = () => {
        setCorrectLetters([]);
        setWrongLetters([]);
        setMaxGuesses(word.length >= 5 ? 8 : 6);
        setInputValue("");
    };

    const handleInputChange = (e) => {
        const letter = e.target.value.toLowerCase();
        setInputValue(""); // Clear input field

        if (
            !/^[a-z]$/.test(letter) ||
            wrongLetters.includes(letter) ||
            correctLetters.includes(letter)
        ) {
            return;
        }

        if (word.includes(letter)) {
            setCorrectLetters((prev) => [...prev, letter]);
        } else {
            setWrongLetters((prev) => [...prev, letter]);
            setMaxGuesses((prev) => prev - 1);
        }
    };

    const handleNextWord = () => {
        if (currentWordIndex + 1 < wordList.length) {
            setCurrentWordIndex((prev) => prev + 1);
            resetCurrentWord();
        } else {
            setGameCompleted(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && allLettersGuessed) {
            handleNextWord();
        }
    };

    const allLettersGuessed = word
        .replace(/ /g, "") // Ignore spaces
        .split("")
        .every((letter) => correctLetters.includes(letter));

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Guess the Word Game</h1>
            <div className="card p-4 shadow-sm">
                {!gameCompleted ? (
                    <>
                        <div className="mb-3">
                            <h5 className="card-title">Hint: <span className="text-primary">{hint}</span></h5>
                        </div>
                        <div className="mb-3">
                            <h6 className="card-subtitle mb-2 text-muted">
                                Remaining guesses: <span className="text-danger">{maxGuesses}</span>
                            </h6>
                        </div>
                        <div className="mb-3">
                            <h6 className="card-subtitle mb-2 text-muted">
                                Wrong letters: <span className="text-danger">{wrongLetters.join(", ") || "None"}</span>
                            </h6>
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            {word.split("").map((letter, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    className="form-control mx-1"
                                    style={{ width: "3rem", textAlign: "center" }}
                                    value={correctLetters.includes(letter) || letter === " " ? letter : ""}
                                    disabled
                                />
                            ))}
                        </div>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Type a letter"
                            value={inputValue}
                            maxLength="1"
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="text-center">
                            {allLettersGuessed && (
                                <button className="btn btn-success me-2" onClick={handleNextWord}>
                                    Next Word
                                </button>
                            )}
                            {!allLettersGuessed && (
                                <button className="btn btn-primary me-2" onClick={resetCurrentWord}>
                                    Reset Word
                                </button>
                            )}
                            <span className="px-3"></span>
                            <button className="btn btn-primary" onClick={() => navigate('/learn/1')}>
                                Return to Dashboard
                            </button>
                        </div>
                        {maxGuesses < 1 && !allLettersGuessed && (
                            <div className="alert alert-danger mt-3 text-center">
                                Game Over! The word was <strong>{word.toUpperCase()}</strong>.
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-success">Congrats! 🎉 You guessed all the words!</h2>
                        <button className="btn btn-primary mt-3" onClick={() => {
                            setGameCompleted(false);
                            setCurrentWordIndex(0);
                            resetCurrentWord();
                        }}>
                            Play Again
                        </button>
                        <span className="px-3"></span>
                        <button className="btn btn-primary mt-3" onClick={() => navigate('/learn/1')}>
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;
