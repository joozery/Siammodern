import React from 'react';
import './body.css';
import { useLocation, useParams } from 'react-router-dom'; // ✅ ใช้ useParams
import Top from './Top Section/Top';
import Listing from './Listing Section/Listing';
import Activity from './Activity Section/Activity';
import ContentUserManagement from '../UserManagement/ContentUserManagement/ContentUserManagement';
import StockData from '../Stock/StockData';
import SuppierData from '../Suppier/SuppierData';
import PurchaseData from '../Purchase/PurchaseData';
import RequisitionData from '../Requisition/RequisitionData';
import Priceparsionform from '../Priceparsion/Priceparsionform';
import ReceivingPurchaseData from '../ReceivingPurchase/ReceivingPurchaseData';
import ReceivingPurchaseHistoryData from '../PriceparsionHistory/PriceparsionHistoryData';
import SignApprovalPage from '../ReceivingPurchase/SignApprovalPage';
import SummaryContent from '../SummaryPage/SummaryContent'; // ✅ นำเข้า SummaryPage

const Body = () => {
  const location = useLocation();
  const { id } = useParams(); // ✅ ใช้ useParams ดึงค่า id ถ้ามี
  const currentPath = location.pathname;

  return (
    <div className="mainContent">
      <Top page={currentPath} />

      {/* ✅ หน้า Dashboard */}
      {currentPath === '/dashboard' && (
        <div className="bottom flex">
          <Listing />
          <Activity />
        </div>
      )}

      {/* ✅ หน้า User Management */}
      {currentPath === '/UserManagement' && <ContentUserManagement />}

      {/* ✅ หน้าอื่น ๆ ที่ใช้ข้อมูล */}
      {currentPath === '/Stock' && <StockData />}
      {currentPath === '/Suppier' && <SuppierData />}
      {currentPath === '/Purchase' && <PurchaseData />}
      {currentPath === '/Requisition' && <RequisitionData />}
      {currentPath === '/Receipt' && <ReceivingPurchaseData />}
      {currentPath === '/Priceparsion' && <Priceparsionform />}
      {currentPath === '/PriceparsionHistory' && <ReceivingPurchaseHistoryData />}
      {currentPath === '/summary' && <SummaryContent />} {/* ✅ เพิ่มหน้า Summary */}

      {/* ✅ แสดงหน้า SignApprovalPage เฉพาะเมื่อมี id */}
      {currentPath.startsWith('/sign') && id ? <SignApprovalPage id={id} /> : null}
    </div>
  );
};

export default Body;