import React from 'react';
import '../styles/Dashboard.scss'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>This is a protected dashboard only accessible to logged-in users.</p>
    </div>
  );
};

export default Dashboard;
