



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../Styles/Components/Sidebar.css';
import { useAuth } from '../../../Components/Context/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {!collapsed && (
        <div className="Title">
          <h4>Hi, Admin </h4>
        </div>
      )}
      <div className="position-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <div className={`sidebar-toggle ${collapsed ? 'collapsed' : ''}`} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} className="toggle-icon" />
            </div>
          </li>
          <li className={`nav-item ${location.pathname === '/admindashboard' ? 'active' : ''}`}>
            <Link className="nav-link" to="/admindashboard">
              {!collapsed && <span className="link_text">Dashboard</span>}
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/user' ? 'active' : ''}`}>
            <Link className="nav-link" to="/user">
              {!collapsed && <span className="link_text">Users</span>}
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/manageUsers' ? 'active' : ''}`}>
            <Link className="nav-link" to="/manageUsers">
              {!collapsed && <span className="link_text">Manage Users</span>}
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '/scores' ? 'active' : ''}`}>
            <Link className="nav-link" to="/scores">
              {!collapsed && <span className="link_text">Scores</span>}
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === '' ? 'active' : ''}`}>
            <Link className="nav-link" to="">
              {!collapsed && <span className="link_text">Reports</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;