import React from 'react';
import "../../Styles/Header2.css";
import Logout from '../Logout/Logout';

const Header2 = () => {
    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logout clicked");
    };

    return (
        <div className="page-row header2">
            <h3 id="greeting" className='hellohead'>Hello, Guest </h3>
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
