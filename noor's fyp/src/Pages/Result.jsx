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


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Result() {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Tracks which specific card is currently generating a PDF to show a loading spinner
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch all assessment records from your active Render backend
        const res = await axios.get("https://careercompassbackend-1.onrender.com/api/assessments/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        
        setHistoryData(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        alert("Could not load your assessment history. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const handleDownloadPDF = async (recordId, dateString) => {
    setDownloadingId(recordId);
    
    // Dynamically target the specific card's DOM ID
    const element = document.getElementById(`report-card-${recordId}`);
    
    if (!element) {
      setDownloadingId(null);
      return;
    }

    try {
      // Capture the styled HTML element as a high-resolution image
      const canvas = await html2canvas(element, {
        scale: 2, // Increases PDF resolution density
        useCORS: true,
        backgroundColor: "#0f0c26" // Matches your premium dark theme background
      });

      const imgData = canvas.toDataURL("image/png");
      
      // Calculate aspect ratio to fit the PDF A4 page dynamically
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF document and trigger the browser download
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      // Clean up the date string for the file name
      const safeDate = new Date(dateString).toISOString().split('T')[0];
      pdf.save(`Career_Compass_Report_${safeDate}.pdf`);
      
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("There was an issue generating your report.");
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0f0c26", color: "#f5a623", fontFamily: "system-ui, sans-serif" }}>
        <h2>Retrieving your career history matrices...</h2>
      </div>
    );
  }

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
      
      {/* Top Navigation Bar */}
      <div style={{ width: "100%", maxWidth: "800px", display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
        <button 
          onClick={() => navigate("/dashboard")}
          style={{ padding: "10px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s ease" }}
        >
          ← Back to Dashboard
        </button>
        <button 
          onClick={() => navigate("/assessment")}
          style={{ padding: "10px 20px", background: "rgba(245, 166, 35, 0.15)", border: "1px solid #f5a623", color: "#f5a623", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          + Take New Assessment
        </button>
      </div>

      <h1 style={{ marginBottom: "40px", fontSize: "32px", background: "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Your Assessment Portfolio
      </h1>

      {historyData.length === 0 ? (
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "40px", borderRadius: "12px", textAlign: "center" }}>
          <h3 style={{ color: "#a095b5" }}>No assessment records found.</h3>
          <p style={{ color: "#d1cbdc" }}>Complete your first profile evaluation to generate a report.</p>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "50px" }}>
          
          {/* Map through all database records and render a card for each */}
          {historyData.map((record) => {
            const rec = record.recommendation;
            const isCurrentlyDownloading = downloadingId === record._id;
            
            // Format confidence string back to text based on the mapped score from the backend
            let confidenceText = "Medium";
            let confidenceColor = "#ffeb3b";
            if (rec.confidenceScore >= 90) {
              confidenceText = "High";
              confidenceColor = "#4caf50";
            } else if (rec.confidenceScore < 60) {
              confidenceText = "Low";
              confidenceColor = "#f44336";
            }

            return (
              <div key={record._id} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                
                {/* Individual Card Control Bar (Not Included in PDF) */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px" }}>
                  <span style={{ color: "#a095b5", fontSize: "14px", fontWeight: "500" }}>
                    Analysis Date: {new Date(rec.analysisDate || record.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  
                  <button 
                    onClick={() => handleDownloadPDF(record._id, rec.analysisDate || record.createdAt)}
                    disabled={isCurrentlyDownloading}
                    style={{
                      padding: "8px 20px",
                      background: "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)",
                      border: "none",
                      color: "#0f0c26",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      cursor: isCurrentlyDownloading ? "wait" : "pointer",
                      boxShadow: "0 4px 15px rgba(245, 166, 35, 0.2)",
                      transition: "transform 0.2s ease"
                    }}
                  >
                    {isCurrentlyDownloading ? "Generating..." : "📥 Download PDF"}
                  </button>
                </div>

                {/* 📄 THE ACTUAL REPORT CARD (This div is what html2canvas captures) */}
                <div 
                  id={`report-card-${record._id}`} 
                  style={{
                    background: "rgba(30, 24, 64, 0.95)", 
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    padding: "50px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                  }}
                >
                  <div style={{ textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "30px", marginBottom: "30px" }}>
                    <h1 style={{ fontSize: "32px", margin: "0 0 10px 0", background: "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      Career Compass Evaluation
                    </h1>
                    <p style={{ color: "#a095b5", margin: 0 }}>AI-Powered Professional Trajectory Analysis</p>
                  </div>

                  <div style={{ marginBottom: "40px" }}>
                    <h3 style={{ color: "#a095b5", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px 0" }}>
                      Recommended Career Path
                    </h3>
                    <h2 style={{ fontSize: "28px", color: "#ffffff", margin: "0 0 15px 0" }}>
                      {rec.primaryField}
                    </h2>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <span style={{ background: "rgba(255,255,255,0.05)", padding: "8px 16px", borderRadius: "20px", fontSize: "14px" }}>
                        Engine Confidence: 
                        <strong style={{ color: confidenceColor, marginLeft: "8px" }}>
                          {confidenceText} ({rec.confidenceScore}%)
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.2)", padding: "25px", borderRadius: "12px", borderLeft: "4px solid #f5a623", marginBottom: "40px" }}>
                    <h3 style={{ color: "#f5a623", fontSize: "16px", margin: "0 0 15px 0" }}>Diagnostic Reasoning</h3>
                    <p style={{ color: "#d1cbdc", lineHeight: "1.7", fontSize: "15px", margin: 0 }}>
                      {rec.reasoning}
                    </p>
                  </div>

                  <div>
                    <h3 style={{ color: "#a095b5", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 15px 0" }}>
                      Suggested Skill Acquisition Vector
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {record.suggested_skills?.map((skill, index) => (
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

                  <div style={{ marginTop: "50px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
                    Generated by Gemini 2.5 Flash Core Engine • ID: {record._id.slice(-6).toUpperCase()}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}