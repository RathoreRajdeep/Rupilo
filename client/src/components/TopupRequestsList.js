import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/TopupRequestsList.css";
import { FaCheckCircle, FaTimesCircle, FaClock, FaList } from "react-icons/fa";

const TopupRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://rupilobackend.onrender.com/api/topup-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch requests");
      }
    };

    fetchRequests();
  }, [refresh]);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://rupilobackend.onrender.com/api/topup-requests/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefresh(!refresh);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update request");
    }
  };

  const total = requests.length;
  const approved = requests.filter((r) => r.status === "approved").length;
  const rejected = requests.filter((r) => r.status === "rejected").length;
  const pending = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="topup-requests-container">
      <h2>Top-Up Requests</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card total">
          <FaList />
          <div>
            <p>Total Requests</p>
            <h3>{total}</h3>
          </div>
        </div>
        <div className="summary-card pending">
          <FaClock />
          <div>
            <p>Pending</p>
            <h3>{pending}</h3>
          </div>
        </div>
        <div className="summary-card approved">
          <FaCheckCircle />
          <div>
            <p>Approved</p>
            <h3>{approved}</h3>
          </div>
        </div>
        <div className="summary-card rejected">
          <FaTimesCircle />
          <div>
            <p>Rejected</p>
            <h3>{rejected}</h3>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {requests.length === 0 ? (
        <p className="no-requests">No requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th className="hide-email">Email</th>
              <th className="hide-amount">Amount</th>
              <th className="hide-status">Status</th>
              <th className="hide-date">Requested At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.user?.name.split(" ")[0] || "N/A"}</td>
                <td className="hide-email">{req.user?.email || "N/A"}</td>
                <td className="hide-amount">₹{req.amount}</td>
                <td className="hide-status">
                  <span className={`status-tag ${req.status}`}>{req.status}</span>
                </td>
                <td className="hide-date">{new Date(req.requestedAt).toLocaleString()}</td>
                <td>
                  {req.status === "pending" ? (
                    <>
                      <button onClick={() => handleAction(req._id, "approve")} className="approve-btn">
                        <FaCheckCircle />
                      </button>
                      <button onClick={() => handleAction(req._id, "reject")} className="reject-btn">
                        <FaTimesCircle />
                      </button>
                    </>
                  ) : (
                    <em>{req.status}</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopupRequestsList;
