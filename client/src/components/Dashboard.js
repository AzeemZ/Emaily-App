import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="fixed-action-btn" style={{ right: "15vw" }}>
      <Link to="/surveys/new" className="btn-floating btn-large red">
        <i className="large material-icons">add</i>
      </Link>
    </div>
  );
};

export default Dashboard;
