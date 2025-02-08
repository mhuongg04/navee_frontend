import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";

const wordList = [
    {
        id: 1,
        tittle: "Topic 1: Lesson 1",
        parts: [
            { word: "pedestrian", hint: "A person walking on the road" },
            { word: "traffic jam", hint: "When vehicles cannot move" },
            { word: "passenger", hint: "A person traveling in a vehicle" },
            { word: "seat belt", hint: "Safety device in cars" },
            { word: "bumpy", hint: "An uneven or rough road" }
        ]
    },
    {
        id: 2,
        tittle: "Topic 1: Lesson 2",
        parts: [
            { word: "vehicle", hint: "A thing used to travel, like a car or bus" },
            { word: "pavement", hint: "The hard path where people walk" },
            { word: "motorbike", hint: "A small vehicle with two wheels and a motor" },
            { word: "handlebar", hint: "The part you hold to steer a bike or motorbike" },
            { word: "traffic law", hint: "The rules for how cars and people should behave on the road" }
        ]
    },
    {
        id: 3,
        tittle: "Topic 1: Lesson 3",
        parts: [
            { word: "rush hour", hint: "The time when many people are on the road" },
            { word: "car", hint: "A vehicle with four wheels that people drive" },
            { word: "bus", hint: "A big vehicle that carries many people" },
            { word: "airplane", hint: "A vehicle that flies in the sky" }
        ]
    }

];

const Game = () => {
    const { id } = useParams();  // Lấy id từ URL
    const lesson = wordList.find((lesson) => lesson.id === parseInt(id));
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [maxGuesses, setMaxGuesses] = useState(6);
    const [inputValue, setInputValue] = useState("");
    const [gameCompleted, setGameCompleted] = useState(false);

    const { word, hint } = lesson ? lesson.parts[currentWordIndex] : {};

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
        if (currentWordIndex + 1 < lesson.parts.length) {
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
                            <h5 className="card-title">Gợi ý: <span className="text-primary">{hint}</span></h5>
                        </div>
                        <div className="mb-3">
                            <h6 className="card-subtitle mb-2 text-muted">
                                Số lần đoán còn lại: <span className="text-danger">{maxGuesses}</span>
                            </h6>
                        </div>
                        <div className="mb-3">
                            <h6 className="card-subtitle mb-2 text-muted">
                                Đoán sai: <span className="text-danger">{wrongLetters.join(", ") || "None"}</span>
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
                                    Từ tiếp theo
                                </button>
                            )}
                            {!allLettersGuessed && (
                                <button className="btn btn-primary me-2" onClick={resetCurrentWord}>
                                    Chơi lại
                                </button>
                            )}
                            <span className="px-3"></span>
                            <button className="btn btn-primary" onClick={() => navigate('/learn/1')}>
                                Trở lại trang học tập
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
