import React from 'react';
import "../../Styles/Header2.css";
import Logout from '../Logout/Logout';
import { useAuth } from '../Context/AuthContext';

const Header2 = () => {
    const { user } = useAuth();
    console.log("User data:", user);
    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logout clicked");
    };

    return (
        <div className="page-row header2">
            <h3  className='hellohead'>{user ? `Hello, ${user.name}` : "Hello, Guest"} </h3>
            <div className="logout-button">
                {/* <a href="#" className="logout-icon ui-link" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </a> */}
            </div>
            <Logout />
        </div>
    );
};

export default Header2;
