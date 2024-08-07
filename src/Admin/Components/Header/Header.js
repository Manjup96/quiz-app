import React from 'react'

import company_logo from "../../../Admin/Components/Img/FoELogo_105x57 (1).png" ; 
import chipper_sage_logo from "../Img/chipper-sage-logo.png";
import '../../../Styles/AdminHeader.css';
import Logout from '../Logout/Logout';

const Header = () => {
  return (
    <div>
      <div className="headeradmin">
      <img src={company_logo} alt="" className="company-logo-admin"/>
      <h5><span className='flowhead-admin'>Flow Of English</span> - <span className='learnerhead-admin'>Learner</span></h5>
      <img src={chipper_sage_logo} alt="" className="chipper-logo"/>
      <div className="logout-button">
        <Logout />
      </div>
    </div>
    </div>
  )
}

export default Header
