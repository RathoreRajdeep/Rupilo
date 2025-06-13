import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminUserList.css';
import { FaUsers, FaMoneyBillWave, FaPhoneAlt, FaWallet } from 'react-icons/fa';

const AdminUserList = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profile/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data);
      } catch (err) {
        alert("Failed to load users");
      }
    };

    fetchUsers();
  }, [token]);

  const totalUsers = users.length;
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
  const zeroBalanceUsers = users.filter(user => user.balance === 0).length;
  const nonAdminUsers = users.filter(user => !user.isAdmin).length;


  return (
    <div className="admin-users-container">
      <h2>All Registered Users</h2>

      {/* Summary cards */}
      <div className="summary-cards">
        <div className="summary-card blue">
          <FaUsers />
          <div>
            <p>Total Users</p>
            <h3>{totalUsers}</h3>
          </div>
        </div>
        <div className="summary-card green">
          <FaMoneyBillWave />
          <div>
            <p>Total Wallet Volume</p>
            <h3>₹{totalBalance}</h3>
          </div>
        </div>
        <div className="summary-card red">
          <FaWallet />
          <div>
            <p>Empty Accounts</p>
            <h3>{zeroBalanceUsers}</h3>
          </div>
        </div>
        <div className="summary-card purple">
  <FaUsers />
  <div>
    <p>Non-Admin Users</p>
    <h3>{nonAdminUsers}</h3>
  </div>
</div>

      </div>

      {/* User Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className="hide-name">Name</th>
              <th className="hide-email">Email</th>
              <th className="hide-phone">Phone</th>
              <th>VPA</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="hide-name">{user.name || 'N/A'}</td>
                <td className="hide-email">{user.email}</td>
                <td className="hide-phone">{user.phone || 'N/A'}</td>
                <td>{user.vpa || 'N/A'}</td>
                <td>₹{user.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;
