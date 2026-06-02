import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Imported toast utilities
import "../styles/Result.css"; 

const Result = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all historical records
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://careercompassbackend-1.onrender.com/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    // Elegant check replacement configuration
    if (!window.confirm("Are you sure you want to permanently delete this career assessment record?")) {
      return; 
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://careercompassbackend-1.onrender.com/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Instantly update the UI array state
      setHistory(history.filter(record => record._id !== id));
      
      // ✅ SUCCESS TOAST
      toast.success("Assessment record deleted successfully.");
    } catch (err) {
      console.error("Error deleting record:", err);
      // ✅ ERROR TOAST
      toast.error("System error: Unable to drop record instance.");
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
          <h1 className="title">Assessment History</h1>
          <p className="subtitle">All Past Counselor Analyses ({history.length})</p>

          {history.length === 0 ? (
            <p style={{ color: "#aaa", marginTop: "20px" }}>
              No past assessments found. Take a quiz to generate data!
            </p>
          ) : (
            <div className="grid">
              {history.map((record, index) => (
                <div key={record._id} className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "10px" }}>
                    <span className="card-title">
                      RECORD #{history.length - index} — {new Date(record.createdAt).toLocaleDateString()}
                    </span>
                    
                    <button 
                      onClick={() => handleDelete(record._id)}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.4)",
                        color: "#ef4444",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      Delete
                    </button>
                  </div>

                  <h2 style={{ fontSize: "20px", color: "#ffffff", margin: "5px 0 12px 0" }}>
                    {record.recommendation?.primaryField || "Career Path Recommended"}
                  </h2>

                  <div className="progress">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${record.recommendation?.confidenceScore || 75}%` }}
                    ></div>
                  </div>
                  <span style={{ fontSize: "11px", color: "#aaa", display: "block", marginTop: "6px" }}>
                    Match Confidence: {record.recommendation?.confidenceScore || 75}%
                  </span>

                  <div className="matches">
                    <p className="match-title">Suggested Skills Development:</p>
                    <div className="badges">
                      {record.suggested_skills && record.suggested_skills.length > 0 ? (
                        record.suggested_skills.map((skill, sIdx) => (
                          <span key={sIdx} className="badge">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;