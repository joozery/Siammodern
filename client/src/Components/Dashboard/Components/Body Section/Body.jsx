import React from 'react'
import './body.css'
import { useLocation } from 'react-router-dom';
import Top from './Top Section/Top'
import Listing from './Listing Section/Listing'
import Activity from './Activity Section/Activity'
// import Stock from '../Stock/Stock'
import ContentUserManagement from '../UserManagement/ContentUserManagement/ContentUserManagement'
import StockData from '../Stock/StockData'
import SuppierData from '../Suppier/SuppierData';
import PurchaseData from '../Purchase/PurchaseData';
import RequisitionData from '../Requisition/RequisitionData';
import ReceivingPurchaseData from '../ReceivingPurchase/ReceivingPurchaseData';
import Priceparsionform from '../Priceparsion/Priceparsionform';

const Body = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className='mainContent'>
      <Top page={currentPath}/>
      {currentPath === '/dashboard' && (
        <>
          <div className='bottom flex'>
            <Listing />
            <Activity />
          </div>
        </>
      )}
      {currentPath === '/UserManagement' && <ContentUserManagement />}
      {currentPath === '/Stock' && <StockData />}
      {currentPath === '/Suppier' && <SuppierData />}
      {currentPath === '/Purchase' && <PurchaseData />}
      {currentPath === '/Requisition' && <RequisitionData />}
      {currentPath === '/Receipt' && <ReceivingPurchaseData />}
      {currentPath === '/Priceparsion' && <Priceparsionform />}
    </div>
  )
}

export default Body