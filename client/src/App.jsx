import './App.css'
import './Components/custom-table.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import UserManagement from './Components/Dashboard/Components/UserManagement/UserManagement.jsx';
import StockPage from './Components/Dashboard/Components/Stock/Stock.jsx';
import PurchasePage from './Components/Dashboard/Components/Purchase/Purchase.jsx';
import SuppierPage from './Components/Dashboard/Components/Suppier/Suppier.jsx';
import ProductReceiptPage from './Components/Dashboard/Components/ProductReceipt/ProductReceipt.jsx';
import RequisitionPage from './Components/Dashboard/Components/Requisition/Requisition.jsx';
import PriceparsionHistoryPage from './Components/Dashboard/Components/PriceparsionHistory/PriceparsionHistory.jsx';
import PriceparsionPage from './Components/Dashboard/Components/Priceparsion/Priceparsion.jsx';
import SignApprovalPage from './Components/Dashboard/Components/ReceivingPurchase/SignApprovalPage';


// Import React router dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// lets create a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path: '/Stock',
    element: <div><StockPage/></div>
  },
  {
    path: '/Requisition',
    element: <div><RequisitionPage/></div>
  },
  {
    path: '/Receipt',
    element: <div><ProductReceiptPage/></div>
  },
  {
    path: '/PriceparsionHistory',
    element: <div><PriceparsionHistoryPage/></div>
  },
  {
    path: '/Suppier',
    element: <div><SuppierPage/></div>
  },
  {
    path: '/purchase',
    element: <div><PurchasePage/></div>
  },
  {
    path: '/UserManagement',
    element: <div><UserManagement/></div>
  },
  {
    path: '/sign/:id', // เพิ่มเส้นทางสำหรับ SignApprovalPage
    element: <div><SignApprovalPage /></div>
  }
]);

function App() {
  return (
   <div>
     <RouterProvider router={router}/>
   </div>
  )
}

export default App
