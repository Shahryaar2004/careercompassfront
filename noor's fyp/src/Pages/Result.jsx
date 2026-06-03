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
import axios from "axios";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css"; 

const Result = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  // Fetch all historical records
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://careercompassbackend-1.onrender.com/api/assessments/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Ensure we always set an array to state so the .map() function works for all cards
      setHistory(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error("Error fetching historical results:", err);
      toast.error("Failed to sync history from cloud gateway.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // THE DELETE HANDLER
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this career assessment record?")) {
      return; 
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://careercompassbackend-1.onrender.com/api/assessments/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Instantly update the UI array state to remove the deleted card
      setHistory(history.filter(record => record._id !== id));
      toast.success("Assessment record deleted successfully.");
    } catch (err) {
      console.error("Error deleting record:", err);
      toast.error("System error: Unable to drop record instance.");
    }
  };

  // THE PDF GENERATOR HANDLER
  const handleDownloadPDF = async (recordId, dateString) => {
    setDownloadingId(recordId);
    
    // Target the specific card container
    const element = document.getElementById(`card-${recordId}`);
    if (!element) {
      setDownloadingId(null);
      return;
    }

    try {
      // Capture the card visually
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: "#1d1841" // Safe fallback background color matching your dark theme
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      // Calculate scaling to fit A4 perfectly
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      const safeDate = new Date(dateString).toISOString().split('T')[0];
      pdf.save(`Career_Compass_Report_${safeDate}.pdf`);
      
      toast.success("PDF Report generated successfully!");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Error generating PDF document.");
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="result-page">
        <div className="result-container">
          <h1 className="title">Loading History...</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", overflowX: "hidden", display: "block" }}>
      <div className="result-page">
        <div className="result-container">
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h1 className="title" style={{ margin: 0 }}>Assessment History</h1>
              <p className="subtitle" style={{ margin: "5px 0 0 0" }}>All Past Counselor Analyses ({history.length})</p>
            </div>
            
            <button 
              onClick={() => navigate("/assessment")}
              style={{
                padding: "10px 20px", background: "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)", 
                border: "none", color: "#0f0c26", borderRadius: "8px", cursor: "pointer", fontWeight: "bold"
              }}
            >
              + New Assessment
            </button>
          </div>

          {history.length === 0 ? (
            <p style={{ color: "#aaa", marginTop: "20px", textAlign: "center", padding: "40px", background: "rgba(255,255,255,0.05)", borderRadius: "12px" }}>
              No past assessments found. Take a quiz to generate data!
            </p>
          ) : (
            <div className="grid">
              {history.map((record, index) => {
                const rec = record.recommendation || {};
                const isDownloading = downloadingId === record._id;

                return (
                  <div key={record._id} id={`card-${record._id}`} className="card" style={{ position: "relative" }}>
                    
                    {/* ACTION BAR: Ignored by HTML2Canvas so it doesn't show in the PDF */}
                    <div data-html2canvas-ignore="true" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "15px" }}>
                      <span className="card-title" style={{ fontWeight: "bold" }}>
                        RECORD #{history.length - index} — {new Date(record.createdAt).toLocaleDateString()}
                      </span>
                      
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button 
                          onClick={() => handleDownloadPDF(record._id, record.createdAt)}
                          disabled={isDownloading}
                          style={{
                            background: "rgba(245, 166, 35, 0.15)", border: "1px solid #f5a623", color: "#f5a623",
                            padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: isDownloading ? "wait" : "pointer",
                            fontWeight: "bold"
                          }}
                        >
                          {isDownloading ? "..." : "📥 PDF"}
                        </button>

                        <button 
                          onClick={() => handleDelete(record._id)}
                          style={{
                            background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#ef4444",
                            padding: "6px 14px", borderRadius: "6px", fontSize: "12px", cursor: "pointer"
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* PDF CAPTURE CONTENT */}
                    <div style={{ paddingBottom: "10px" }}>
                      <h2 style={{ fontSize: "22px", color: "#ffffff", margin: "5px 0 15px 0" }}>
                        {rec.primaryField || "Career Path Recommended"}
                      </h2>

                      <div className="progress">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${rec.confidenceScore || 75}%`, background: "linear-gradient(90deg, #f5a623 0%, #ffca28 100%)" }}
                        ></div>
                      </div>
                      
                      <span style={{ fontSize: "12px", color: "#aaa", display: "block", marginTop: "8px", marginBottom: "20px" }}>
                        Engine Confidence Match: <strong style={{color: "#f5a623"}}>{rec.confidenceScore || 75}%</strong>
                      </span>

                      {/* Included the AI Reasoning so the PDF has detailed text! */}
                      {rec.reasoning && (
                        <div style={{ background: "rgba(0,0,0,0.3)", padding: "15px", borderRadius: "8px", borderLeft: "3px solid #f5a623", marginBottom: "20px" }}>
                          <p style={{ margin: 0, fontSize: "13px", color: "#d1cbdc", lineHeight: "1.6" }}>
                            {rec.reasoning}
                          </p>
                        </div>
                      )}

                      <div className="matches">
                        <p className="match-title" style={{ color: "#a095b5", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px", marginBottom: "10px" }}>
                          Suggested Skills Development:
                        </p>
                        <div className="badges">
                          {record.suggested_skills && record.suggested_skills.length > 0 ? (
                            record.suggested_skills.map((skill, sIdx) => (
                              <span key={sIdx} className="badge" style={{ background: "rgba(245, 166, 35, 0.1)", color: "#f5a623", borderColor: "rgba(245, 166, 35, 0.3)" }}>
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="badge" style={{ borderColor: "#555", color: "#888" }}>
                              General Profile
                            </span>
                          )}
                        </div>
                      </div>

                      {/* PDF Print Timestamp (Only visible well in the generated PDF if the card grows) */}
                      <div data-html2canvas-ignore="false" style={{ marginTop: "25px", fontSize: "10px", color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
                        Generated by PrimeLogic Gemini Interface
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;