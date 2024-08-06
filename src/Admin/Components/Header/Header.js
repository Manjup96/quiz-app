import React from 'react'

import company_logo from "../../../Admin/Components/Img/FoELogo_105x57 (1).png" ; 
import '../../../Styles/AdminHeader.css';
import Logout from '../Logout/Logout';

const Header = () => {
  return (
    <div>
      <div className="headeradmin">
      <img src={company_logo} alt="" className="company-logo-admin"/>
      <div className="logout-button">
        <Logout />
      </div>
    </div>
    </div>
  )
}

export default Header
