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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { loadAnswers, upsertAnswer, analyzeCareerFromAnswers } from "../lib/answersStore";

// export default function Assessment() {
//   const navigate = useNavigate();
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const questions = [
//     {
//       id: 0,
//       question: "Which tasks do you enjoy working on the most?",
//       options: [
//         "Building user interfaces and layout designs", 
//         "Writing backend server logic and databases", 
//         "Analyzing statistical data patterns", 
//         "Managing system infrastructure and deployments"
//       ]
//     },
//     {
//       id: 1,
//       question: "How do you prefer to solve technical challenges?",
//       options: [
//         "Visually sketching out component structures", 
//         "Tracing data control flows step-by-step", 
//         "Applying mathematical formulas and algorithms", 
//         "Automating repetitive script workflows"
//       ]
//     }
//   ];

//   useEffect(() => {
//     const saved = loadAnswers();
//     setAnswers(saved);
//   }, []);

//   const handleSelectOption = (optionIndex) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     const updated = upsertAnswer({
//       questionId: currentQuestion.id,
//       question: currentQuestion.question,
//       selectedAnswer: currentQuestion.options[optionIndex]
//     });
//     setAnswers(updated);
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const assessmentResult = await analyzeCareerFromAnswers(answers);
//       localStorage.setItem("latestAssessmentResult", JSON.stringify(assessmentResult));
//       navigate("/result");
//     } catch (err) {
//       console.error("Submission failed:", err.message);
//       alert("Could not process your results. Please verify your server is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];
//   const currentSavedAnswer = answers.find((a) => a.questionId === currentQuestion.id);

//   if (loading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif" }}>
//         <h2>Analyzing your profile attributes using Gemini Core Engine...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", fontFamily: "sans-serif" }}>
//       <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
//       <p style={{ fontSize: "18px", fontWeight: "bold" }}>{currentQuestion.question}</p>
      
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" }}>
//         {currentQuestion.options.map((option, idx) => (
//           <button
//             key={idx}
//             onClick={() => handleSelectOption(idx)}
//             style={{
//               padding: "12px",
//               textAlign: "left",
//               backgroundColor: currentSavedAnswer?.selectedAnswer === option ? "#d1e7dd" : "#f8f9fa",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               cursor: "pointer"
//             }}
//           >
//             {option}
//           </button>
//         ))}
//       </div>

//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
//         <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} style={{ padding: "10px 20px", cursor: "pointer" }}>
//           Previous
//         </button>

//         {currentQuestionIndex === questions.length - 1 ? (
//           <button onClick={handleSubmit} disabled={answers.length < questions.length} style={{ padding: "10px 20px", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
//             See Results
//           </button>
//         ) : (
//           <button onClick={handleNext} style={{ padding: "10px 20px", cursor: "pointer" }}>
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadAnswers, upsertAnswer, analyzeCareerFromAnswers } from "../lib/answersStore";

export default function Assessment() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false); 
  
  // ⚙️ Self-Contained Professional 8-Question Matrix Bank
  const questions = [
    {
      question: "Which application development workflows do you enjoy working on the most?",
      category: "Technical Specialization",
      options: [
        "Designing responsive user interfaces, animations, and typography layers",
        "Architecting server-side APIs, database schemas, and microservice routers",
        "Building client-side predictive intelligence engines and algorithmic pipelines",
        "Managing server state orchestration, container configurations, and deployments"
      ]
    },
    {
      question: "How do you naturally approach complex technical debugging tasks?",
      category: "Problem Solving Style",
      options: [
        "Inspecting DOM layouts, tracking state reactivity hooks, and style grids",
        "Analyzing terminal server logs, runtime metrics, and query execution spans",
        "Evaluating dataset statistical variations, matrix weights, and formula outputs",
        "Tracing shell execution environments, build arguments, and network ports"
      ]
    },
    {
      question: "Which product roadmap objective sounds the most rewarding to implement?",
      category: "Project Target",
      options: [
        "Crafting fluid dashboard transitions and highly accessible interactive views",
        "Scaling a secure distributed gateway engine to process continuous parallel requests",
        "Integrating client-side image recognition or semantic data classifiers",
        "Implementing automated self-healing clusters with zero downtime deployment pipelines"
      ]
    },
    {
      question: "What layer of a web application codebase is your favorite to refine?",
      category: "Optimization Focus",
      options: [
        "Minifying asset bundle sizes, component memoization, and rendering loops",
        "Refactoring complex database pipelines, indices, and pipeline operations",
        "Enhancing computational execution speeds, mathematical overhead, and models",
        "Reducing image container compilation latency and cluster delivery speeds"
      ]
    },
    {
      question: "Which technology stack or package subset do you explore most comfortably?",
      category: "Ecosystem Familiarity",
      options: [
        "React.js frameworks, Tailwind utility layers, and interactive style sheets",
        "Node.js runtime wrappers, Express middleware configurations, and MongoDB structures",
        "Python automation toolkits, NumPy matrices, and machine learning modules",
        "Linux bash interfaces, Docker virtualization configurations, and cloud utilities"
      ]
    },
    {
      question: "How do you systematically conceptualize a scalable software system?",
      category: "System Modeling Paradigm",
      options: [
        "As an interactive digital space prioritizing user experience and navigation parity",
        "As an architectural grid of transactional microservices transmitting structured data sets",
        "As a predictive analytical channel transforming operational indicators into models",
        "As an infrastructure pipeline focused on uptime validation and automated safety"
      ]
    },
    {
      question: "What style of developmental open-source libraries do you typically install?",
      category: "Dependency Selection",
      options: [
        "Fluid vector transition engines, design systems, and icon graphic layers",
        "Secure token authorization handlers, asynchronous HTTP clients, and ODM drivers",
        "Client-side machine learning architectures and mathematical array processors",
        "Modular unit evaluation systems, automated test runner fixtures, and bundlers"
      ]
    },
    {
      question: "What is your primary long-term operational objective as an engineering professional?",
      category: "Career Vision Tracking",
      options: [
        "Frontend Interface Architect delivering pristine web application layouts",
        "Backend Core Engineer managing decoupled enterprise system logic blocks",
        "Data System or AI Engineer bridging algorithmic pipelines to live interfaces",
        "DevOps Automation Engineer maintaining scalable server cluster stability"
      ]
    }
  ];

  // Heuristic loading processing status strings
  const [analysisStep, setAnalysisStep] = useState(0);
  const analysisMessages = [
    "Compiling contextual behavioral metrics...",
    "Executing heuristic career matrix mapping...",
    "Matching profile against regional market trends...",
    "Synthesizing customized skill track vectors...",
    "Finalizing diagnostic career summary..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setAnalysisStep((prevStep) => {
          if (prevStep < analysisMessages.length - 1) return prevStep + 1;
          return prevStep;
        });
      }, 900);
    } else {
      setAnalysisStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Read local caching buffers into instance maps on component initialization
  useEffect(() => {
    const savedList = loadAnswers();
    const formattedMap = {};
    savedList.forEach((item) => {
      const questionMatchIndex = questions.findIndex((q) => q.question === item.question);
      if (questionMatchIndex !== -1) {
        const optionIndex = questions[questionMatchIndex].options.indexOf(item.selectedAnswer);
        if (optionIndex !== -1) formattedMap[questionMatchIndex] = optionIndex;
      }
    });
    setAnswers(formattedMap);
    if (formattedMap[0] !== undefined) setSelected(formattedMap[0]);
  }, []);

  const handleSelect = (index) => {
    setSelected(index);
    setAnswers((prev) => ({ ...prev, [current]: index }));

    upsertAnswer({
      questionId: current,
      question: questions[current].question,
      selectedAnswer: questions[current].options[index]
    });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      const nextIndex = current + 1;
      setCurrent(nextIndex);
      setSelected(answers[nextIndex] ?? null);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      const prevIndex = current - 1;
      setCurrent(prevIndex);
      setSelected(answers[prevIndex] ?? null);
    }
  };

  const handleSubmitAssessment = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const cleanArrayPayload = Object.keys(answers).map((key) => ({
        questionId: parseInt(key),
        question: questions[key].question,
        selectedAnswer: questions[key].options[answers[key]]
      }));

      const assessmentResult = await analyzeCareerFromAnswers(cleanArrayPayload);
      localStorage.setItem("latestAssessmentResult", JSON.stringify(assessmentResult));

      const timeElapsed = Date.now() - startTime;
      const minimalDuration = 4500; 
      
      if (timeElapsed < minimalDuration) {
        setTimeout(() => navigate("/result"), minimalDuration - timeElapsed);
      } else {
        navigate("/result");
      }
    } catch (err) {
      console.error("Submission error details:", err);
      alert("Evaluation failed. Verify your live server instance status.");
      setLoading(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const isLastQuestion = current === questions.length - 1;
  const isNextDisabled = selected === null || loading; // Strict anti-skip validator parameter

  if (loading) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 12, 38, 0.98)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        color: "#ffffff",
        fontFamily: "system-ui, sans-serif"
      }}>
        <div style={{
          width: "60px",
          height: "60px",
          border: "4px solid rgba(245, 166, 35, 0.1)",
          borderTop: "4px solid #f5a623",
          borderRadius: "50%",
          animation: "spinAround 1s linear infinite",
          marginBottom: "30px"
        }}></div>
        <h2 style={{ fontSize: "26px", fontWeight: "600", letterSpacing: "0.5px", marginBottom: "12px" }}>Analyzing Profile Attributes</h2>
        <p style={{ fontSize: "16px", color: "#a095b5", minHeight: "24px" }}>{analysisMessages[analysisStep]}</p>
        <style>{`@keyframes spinAround { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c26 0%, #1d1841 100%)",
      padding: "60px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
      color: "#ffffff"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "720px",
        background: "rgba(30, 24, 64, 0.65)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}>
        
        {/* Top Operational Status Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", fontSize: "14px", color: "#a095b5", fontWeight: "500" }}>
          <span>QUESTION {current + 1} OF {questions.length}</span>
          <span style={{ color: "#f5a623" }}>{progress}% COMPLETE</span>
        </div>

        {/* Dynamic Micro-Progress Track Component */}
        <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", marginBottom: "35px", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)", transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}></div>
        </div>

        {questions[current].category && (
          <span style={{ display: "inline-block", background: "rgba(245, 166, 35, 0.15)", color: "#f5a623", padding: "6px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "18px" }}>
            {questions[current].category}
          </span>
        )}

        <h2 style={{ fontSize: "24px", fontWeight: "600", lineHeight: "1.4", marginBottom: "35px", color: "#ffffff" }}>
          {questions[current].question}
        </h2>

        {/* Option Container Grid Loop Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
          {questions[current].options.map((opt, index) => {
            const isSelected = selected === index;
            return (
              <div
                key={index}
                onClick={() => handleSelect(index)}
                className="interactive-option-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "18px 24px",
                  background: isSelected ? "rgba(245, 166, 35, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: isSelected ? "2px solid #f5a623" : "2px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.25s ease"
                }}
              >
                <span style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: isSelected ? "#f5a623" : "rgba(255,255,255,0.06)",
                  color: isSelected ? "#0f0c26" : "#a095b5",
                  fontWeight: "700",
                  fontSize: "14px",
                  marginRight: "20px",
                  transition: "all 0.2s ease"
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span style={{ fontSize: "16px", fontWeight: "500", color: isSelected ? "#ffffff" : "#d1cbdc", lineHeight: "1.3" }}>
                  {opt}
                </span>
              </div>
            );
          })}
        </div>

        {/* Interface Controls Lower Action Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "25px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handlePrev}
            disabled={current === 0 || loading}
            style={{
              padding: "12px 26px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px",
              color: current === 0 ? "rgba(255,255,255,0.2)" : "#a095b5",
              cursor: current === 0 ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: "600",
              transition: "all 0.2s ease"
            }}
          >
            ← Previous
          </button>

          <span style={{ fontSize: "14px", color: "#7a7090", fontWeight: "500" }}>
            {answeredCount} OF {questions.length} ANSWERED
          </span>

          <button
            onClick={() => isLastQuestion ? handleSubmitAssessment() : handleNext()}
            disabled={isNextDisabled}
            style={{
              padding: "12px 28px",
              background: isNextDisabled ? "rgba(255,255,255,0.05)" : "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)",
              border: "none",
              borderRadius: "10px",
              color: isNextDisabled ? "rgba(255,255,255,0.2)" : "#0f0c26",
              cursor: isNextDisabled ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: "700",
              boxShadow: isNextDisabled ? "none" : "0 8px 20px rgba(245,166,35,0.2)",
              transition: "all 0.2s ease"
            }}
          >
            {isLastQuestion ? "See Results →" : "Next →"}
          </button>
        </div>

      </div>

      {/* Embedded Operational UI CSS Animation Injection Elements */}
      <style>{`
        .interactive-option-card:hover {
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-2px);
        }
        button:not(:disabled):hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}