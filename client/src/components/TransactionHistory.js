import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './styles/TransactionHistory.css';

const TransactionHistory = ({ token }) => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState('');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const decoded = jwtDecode(token);
    setUserId(decoded.userId);

    const fetchTransactions = async () => {
      try {
        const res = await axios.get('https://rupilobackend.onrender.com/api/transactions/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTransactions(res.data);
      } catch (err) {
        alert("Failed to load transactions");
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div>
      <h2>Your Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table border="1" cellPadding="8" className="transaction-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              {width > 530 ? (
                <>
                  <th>From</th>
                  <th>To</th>
                </>
              ) : (
                <th>Counterparty</th>
              )}

              <th className="date-column">Date</th>
              <th className="message-column">Message</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => {
              const isSelf = txn.sender._id === txn.receiver._id;
              const isSent = txn.sender._id === userId;

              return (
                <tr key={txn._id}>
                  <td>{isSelf ? 'Self' : isSent ? 'Sent' : 'Received'}</td>
                  <td>₹{txn.amount}</td>
                  {width > 530 ? (
                      <>
                        <td>{txn.sender.vpa}</td>
                        <td>{txn.receiver.vpa}</td>
                      </>
                    ) : (
                      <td>
                        {isSelf
                          ? txn.sender.vpa
                          : isSent
                          ? txn.receiver.vpa
                          : txn.sender.vpa}
                      </td>
                  )}

                  <td className="date-column">{new Date(txn.timestamp).toLocaleString()}</td>
                  <td className="message-column">{txn.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
