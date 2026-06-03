// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify"; // ✅ Imported toast utilities
// import "../styles/Result.css"; 

// const Result = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all historical records
//   const fetchHistory = async () => {
//     try {
//       const token = localStorage.getItem("token");
// const res = await axios.get("https://careercompassbackend-1.onrender.com/api/assessments/history", {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
//       });
//       setHistory(Array.isArray(res.data) ? res.data : [res.data]);
//     } catch (err) {
//       console.error("Error fetching historical results:", err);
//       toast.error("Failed to sync history from cloud gateway.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   // THE DELETE HANDLER
//   const handleDelete = async (id) => {
//     // Elegant check replacement configuration
//     if (!window.confirm("Are you sure you want to permanently delete this career assessment record?")) {
//       return; 
//     }

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`https://careercompassbackend-1.onrender.com/api/assessments/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       // Instantly update the UI array state
//       setHistory(history.filter(record => record._id !== id));
      
//       // ✅ SUCCESS TOAST
//       toast.success("Assessment record deleted successfully.");
//     } catch (err) {
//       console.error("Error deleting record:", err);
//       // ✅ ERROR TOAST
//       toast.error("System error: Unable to drop record instance.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="result-page">
//         <div className="result-container">
//           <h1 className="title">Loading History...</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ width: "100%", overflowX: "hidden", display: "block" }}>
//       <div className="result-page">
//         <div className="result-container">
//           <h1 className="title">Assessment History</h1>
//           <p className="subtitle">All Past Counselor Analyses ({history.length})</p>

//           {history.length === 0 ? (
//             <p style={{ color: "#aaa", marginTop: "20px" }}>
//               No past assessments found. Take a quiz to generate data!
//             </p>
//           ) : (
//             <div className="grid">
//               {history.map((record, index) => (
//                 <div key={record._id} className="card">
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px" }}>
//                     <span className="card-title">
//                       RECORD #{history.length - index} — {new Date(record.createdAt).toLocaleDateString()}
//                     </span>
                    
//                     <button 
//                       onClick={() => handleDelete(record._id)}
//                       style={{
//                         background: "rgba(239, 68, 68, 0.1)",
//                         border: "1px solid rgba(239, 68, 68, 0.4)",
//                         color: "#ef4444",
//                         padding: "4px 12px",
//                         borderRadius: "6px",
//                         fontSize: "12px",
//                         cursor: "pointer",
//                         transition: "all 0.2s ease"
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </div>

//                   <h2 style={{ fontSize: "20px", color: "#ffffff", margin: "5px 0 12px 0" }}>
//                     {record.recommendation?.primaryField || "Career Path Recommended"}
//                   </h2>

//                   <div className="progress">
//                     <div 
//                       className="progress-fill" 
//                       style={{ width: `${record.recommendation?.confidenceScore || 75}%` }}
//                     ></div>
//                   </div>
//                   <span style={{ fontSize: "11px", color: "#aaa", display: "block", marginTop: "6px" }}>
//                     Match Confidence: {record.recommendation?.confidenceScore || 75}%
//                   </span>

//                   <div className="matches">
//                     <p className="match-title">Suggested Skills Development:</p>
//                     <div className="badges">
//                       {record.suggested_skills && record.suggested_skills.length > 0 ? (
//                         record.suggested_skills.map((skill, sIdx) => (
//                           <span key={sIdx} className="badge">
//                             {skill}
//                           </span>
//                         ))
//                       ) : (
//                         <span className="badge" style={{ borderColor: "#555", color: "#888" }}>
//                           General Profile
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Result;


import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Result() {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // This ref targets the specific div we want to turn into a PDF
  const reportRef = useRef(null);

  useEffect(() => {
    // Pull the AI's response from local storage where Assessment.jsx saved it
    const savedResult = localStorage.getItem("latestAssessmentResult");
    if (savedResult) {
      setResultData(JSON.parse(savedResult));
    } else {
      // If no data is found, send them back to take the test
      navigate("/assessment");
    }
  }, [navigate]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const element = reportRef.current;

    try {
      // Capture the styled HTML element as a high-res image
      const canvas = await html2canvas(element, {
        scale: 2, // Increases PDF resolution
        useCORS: true,
        backgroundColor: "#0f0c26" // Matches the dark theme background
      });

      const imgData = canvas.toDataURL("image/png");
      
      // Calculate aspect ratio to fit the PDF page
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF and trigger the download
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Career_Compass_Report.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("There was an issue generating your report.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!resultData) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c26 0%, #1d1841 100%)",
      padding: "60px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "system-ui, sans-serif",
      color: "#ffffff"
    }}>
      
      {/* 📥 DOWNLOAD BUTTON CONTROLS */}
      <div style={{ width: "100%", maxWidth: "800px", display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <button 
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#ffffff",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ← Back to Dashboard
        </button>
        <button 
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          style={{
            padding: "10px 24px",
            background: "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)",
            border: "none",
            color: "#0f0c26",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: isDownloading ? "wait" : "pointer",
            boxShadow: "0 4px 15px rgba(245, 166, 35, 0.3)"
          }}
        >
          {isDownloading ? "Generating PDF..." : "📥 Download Full Report"}
        </button>
      </div>

      {/* 📄 THE REPORT CARD (This entire div gets converted to the PDF) */}
      <div 
        ref={reportRef} 
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "rgba(30, 24, 64, 0.95)", // Solid enough for PDF rendering
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          padding: "50px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
        }}
      >
        {/* Report Header */}
        <div style={{ textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "30px", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "32px", margin: "0 0 10px 0", background: "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Career Compass Evaluation
          </h1>
          <p style={{ color: "#a095b5", margin: 0 }}>AI-Powered Professional Trajectory Analysis</p>
        </div>

        {/* Primary Recommendation */}
        <div style={{ marginBottom: "40px" }}>
          <h3 style={{ color: "#a095b5", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px 0" }}>
            Recommended Career Path
          </h3>
          <h2 style={{ fontSize: "28px", color: "#ffffff", margin: "0 0 15px 0" }}>
            {resultData.recommended_field}
          </h2>
          
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ background: "rgba(255,255,255,0.05)", padding: "8px 16px", borderRadius: "20px", fontSize: "14px" }}>
              Engine Confidence: 
              <strong style={{ 
                color: resultData.confidence === "High" ? "#4caf50" : resultData.confidence === "Medium" ? "#ffeb3b" : "#f44336",
                marginLeft: "8px"
              }}>
                {resultData.confidence}
              </strong>
            </span>
          </div>
        </div>

        {/* AI Reasoning Text */}
        <div style={{ background: "rgba(0,0,0,0.2)", padding: "25px", borderRadius: "12px", borderLeft: "4px solid #f5a623", marginBottom: "40px" }}>
          <h3 style={{ color: "#f5a623", fontSize: "16px", margin: "0 0 15px 0" }}>Diagnostic Reasoning</h3>
          <p style={{ color: "#d1cbdc", lineHeight: "1.7", fontSize: "15px", margin: 0 }}>
            {resultData.reasoning}
          </p>
        </div>

        {/* Suggested Skills Tags */}
        <div>
          <h3 style={{ color: "#a095b5", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 15px 0" }}>
            Suggested Skill Acquisition Vector
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {resultData.suggested_skills?.map((skill, index) => (
              <span key={index} style={{
                background: "rgba(245, 166, 35, 0.1)",
                color: "#f5a623",
                border: "1px solid rgba(245, 166, 35, 0.3)",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* PDF Footer Footer */}
        <div style={{ marginTop: "50px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
          Generated by Gemini 2.5 Flash Core • {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}