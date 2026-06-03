// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; 
// import questions from "../data/questions";
// import "../styles/Assessment.css";
// import { analyzeCareerFromAnswers } from "../lib/careerAnalyzer";
// const Assessment = () => {
//   const navigate = useNavigate();

//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(false); 
  
//   // 🔴 NEW STATES FOR ALGORITHM SIMULATION OVERLAY
//   const [analysisStep, setAnalysisStep] = useState(0);
//   const analysisMessages = [
//     "Compiling contextual behavioral metrics...",
//     "Executing heuristic career matrix mapping...",
//     "Matching profile against regional market trends...",
//     "Synthesizing customized skill track vectors...",
//     "Finalizing diagnostic career summary..."
//   ];

//   // Cycles through analysis messages while loading is active
//   useEffect(() => {
//     let interval;
//     if (loading) {
//       interval = setInterval(() => {
//         setAnalysisStep((prevStep) => {
//           if (prevStep < analysisMessages.length - 1) {
//             return prevStep + 1;
//           }
//           return prevStep;
//         });
//       }, 900); // Switches messages every 900ms
//     } else {
//       setAnalysisStep(0);
//     }
//     return () => clearInterval(interval);
//   }, [loading]);

//   const handleSelect = (index) => {
//     setSelected(index);
//     setAnswers((prev) => ({
//       ...prev,
//       [current]: index,
//     }));
//   };

//   const handleNext = () => {
//     if (current < questions.length - 1) {
//       const nextIndex = current + 1;
//       setCurrent(nextIndex);
//       setSelected(answers[nextIndex] ?? null);
//     }
//   };

//   const handlePrev = () => {
//     if (current > 0) {
//       const prevIndex = current - 1;
//       setCurrent(prevIndex);
//       setSelected(answers[prevIndex] ?? null);
//     }
//   };

// //   const handleSubmitAssessment = async () => {
// //     setLoading(true);
    
// //     // Create execution timestamp anchor point to enforce a premium calculation delay animation duration
// //     const startTime = Date.now();

// //     try {
// //       const token = localStorage.getItem("token");

// //       const payload = {
// //         responses: answers,
// //         recommendation: {
// //           primaryField: "Software Engineering",
// //           confidenceScore: 88,
// //           analysisDate: new Date()
// //         },
// //         suggested_skills: ["JavaScript", "React.js", "Node.js", "Problem Solving"] 
// //       };

// //       // Dispatches processing data straight to the server instance
// //       await axios.post("https://careercompassbackend.onrender.com/api/assessments/save", payload, {
// //   headers: {
// //     Authorization: `Bearer ${token}`
// //   }
// // });

// //       // Enforce animation window buffer so matching metrics text sequence doesn't cut off abruptly
// //       const timeElapsed = Date.now() - startTime;
// //       const minimalDuration = 4500; // 4.5 seconds to ensure clean layout sequencing
      
// //       if (timeElapsed < minimalDuration) {
// //         setTimeout(() => {
// //           navigate("/result");
// //         }, minimalDuration - timeElapsed);
// //       } else {
// //         navigate("/result");
// //       }

// //     } catch (err) {
// //       console.error("Failed to save assessment:", err);
// //       alert("Database error: Could not save your answers.");
// //       navigate("/result");
// //     }
// //   };

// const handleSubmitAssessment = async () => {
//   setLoading(true);
//   try {
//     const token = localStorage.getItem("token");

//     const formattedQuestions = questions.map((q, idx) => ({
//       questionId: idx,
//       question: q.question,
//       selectedAnswer: q.options[answers[idx]] || "No answer selected"
//     }));

//     // ✅ FIXED: Explicitly rename the key payload to "responses" to perfectly match the backend destructuring variables
//     const requestBody = {
//       responses: answers, 
//       formattedQuestions
//     };

//     await axios.post("https://careercompassbackend-1.onrender.com/api/assessments/save", requestBody, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     navigate("/result");
//   } catch (err) {
//     console.error("Submission failed:", err);
//     alert("Submission failed. Check your network or server setup.");
//     setLoading(false);
//   }
// };
// const answeredCount = Object.keys(answers).length;
//   const progress = Math.round((answeredCount / questions.length) * 100);
//   const isLastQuestion = current === questions.length - 1;

//   return (
//     <div className="assessment-container">
//       {/* 🔴 THE EXPERT ALGORITHM ANALYSIS LOADING OVERLAY */}
//       {loading && (
//         <div style={{
//           position: "fixed",
//           inset: 0,
//           background: "rgba(15, 12, 38, 0.95)",
//           backdropFilter: "blur(16px)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 5000,
//           color: "white"
//         }}>
//           {/* Animated Spinner Core */}
//           <div style={{
//             width: "60px",
//             height: "60px",
//             border: "4px solid rgba(245, 166, 35, 0.1)",
//             borderTop: "4px solid #f5a623",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             marginBottom: "30px"
//           }}></div>
          
//           <h2 style={{ fontSize: "24px", fontWeight: "600", letterSpacing: "0.5px", marginBottom: "10px" }}>
//             Analyzing Profile Engine
//           </h2>
          
//           <p style={{ fontSize: "15px", color: "#a095b5", minHeight: "24px", transition: "all 0.3s ease" }}>
//             {analysisMessages[analysisStep]}
//           </p>

//           {/* Inline Animation Injection Rule keyframe helper hook */}
//           <style>{`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}</style>
//         </div>
//       )}

//       {/* Main Form Layout Container Card Panel Block */}
//       <div className="card">
//         <div className="top-bar">
//           <span>
//             Question {current + 1} of {questions.length}
//           </span>
//           <span>{progress}%</span>
//         </div>
        
//         <div className="progress-bar">
//           <div
//             className="progress-fill"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
        
//         <p className="category">{questions[current].category}</p>
//         <h2 className="question">{questions[current].question}</h2>
        
//         <div className="options">
//           {questions[current].options.map((opt, index) => (
//             <div
//               key={index}
//               className={`option ${selected === index ? "active" : ""}`}
//               onClick={() => handleSelect(index)}
//             >
//               <span className="option-letter">
//                 {String.fromCharCode(65 + index)}
//               </span>
//               <span>{opt}</span>
//             </div>
//           ))}
//         </div>
        
//         <div className="bottom">
//           <button
//             className="prev"
//             onClick={handlePrev}
//             disabled={current === 0 || loading}
//           >
//             ← Previous
//           </button>

//           <span className="counter">
//             {answeredCount} / {questions.length} answered
//           </span>

//           <button
//             className="next"
//             onClick={() => {
//               if (isLastQuestion) {
//                 handleSubmitAssessment();
//               } else {
//                 handleNext();
//               }
//             }}
//             disabled={selected === null || loading}
//           >
//             {isLastQuestion ? "See Results →" : "Next →"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Assessment;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadAnswers, upsertAnswer, analyzeCareerFromAnswers } from "../lib/answersStore";

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 0,
      question: "Which tasks do you enjoy working on the most?",
      options: [
        "Building user interfaces and layout designs", 
        "Writing backend server logic and databases", 
        "Analyzing statistical data patterns", 
        "Managing system infrastructure and deployments"
      ]
    },
    {
      id: 1,
      question: "How do you prefer to solve technical challenges?",
      options: [
        "Visually sketching out component structures", 
        "Tracing data control flows step-by-step", 
        "Applying mathematical formulas and algorithms", 
        "Automating repetitive script workflows"
      ]
    }
  ];

  useEffect(() => {
    const saved = loadAnswers();
    setAnswers(saved);
  }, []);

  const handleSelectOption = (optionIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    const updated = upsertAnswer({
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer: currentQuestion.options[optionIndex]
    });
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const assessmentResult = await analyzeCareerFromAnswers(answers);
      localStorage.setItem("latestAssessmentResult", JSON.stringify(assessmentResult));
      navigate("/result");
    } catch (err) {
      console.error("Submission failed:", err.message);
      alert("Could not process your results. Please verify your server is running.");
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentSavedAnswer = answers.find((a) => a.questionId === currentQuestion.id);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif" }}>
        <h2>Analyzing your profile attributes using Gemini Core Engine...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>{currentQuestion.question}</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" }}>
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(idx)}
            style={{
              padding: "12px",
              textAlign: "left",
              backgroundColor: currentSavedAnswer?.selectedAnswer === option ? "#d1e7dd" : "#f8f9fa",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Previous
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button onClick={handleSubmit} disabled={answers.length < questions.length} style={{ padding: "10px 20px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            See Results
          </button>
        ) : (
          <button onClick={handleNext} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}