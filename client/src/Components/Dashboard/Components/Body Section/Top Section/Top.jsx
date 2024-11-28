import React from 'react'
import './top.css'
import Widget from './Widget'
import Navtop from './Navtop'

const Top = ({ page }) => {
  if (page === '/dashboard') {
    return (
      <div className="topSection">
        <Navtop />
        <Widget />
      </div>
    );
  } else if (page === '/UserManagement') {
    return (
      <div className="topSection">
        <Navtop />
      </div>
    );
  }
};

export default Top