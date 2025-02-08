// import React, { useEffect, useState } from 'react';
import {createHashRouter, Router, RouterProvider,} from 'react-router-dom';
import './App.css'
import HomePage from './components/HomePage';
import ApplyUrl from './components/ApplyUrl';
import ApplyExcel from './components/ApplyExcel.JSX';
// import ConfirmationPage from './components/ConfirmationPage';
// import Layout from './components/Layout';
import NotFound from './components/NotFound';
import EmailLogin from './components/EmailLogin';
import SendGmail from './components/SendGmail';


const routes = [{
  errorElement: <NotFound />,
  children: [{
    path: '/',
    element: <HomePage />,
  },{
    path: '/apply-url',
    element: <ApplyUrl />,
  },{
    path: '/apply-excel',
    element: <ApplyExcel />,
  },{
    path: 'send-gmail',
    element: <SendGmail />,
  },{
    path: '/email-login',
    element: <EmailLogin />,
  }]
}]

const router = createHashRouter(routes);

function App (){
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

// function App() {
//   const [view, setView] = useState('homepage');
//   const [confirmData, setConfirmData] = useState({});

//   useEffect(() => {
//     const handlePopState = (event) => {
//         setView(event.state?.view || 'homepage');
//     };

//     window.addEventListener('popstate', handlePopState);

//     return () => {
//         window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//   const navigateToApplyUrl = () => {
//       window.history.pushState({ view: 'applyUrl' }, '', '/apply-url');
//       setView('applyUrl');
//   };

//   const navigateToApplyExcel = () => {
//       window.history.pushState({ view: 'applyExcel' }, '', '/upload-excel');
//       setView('applyExcel');
//   };

//   const navigateToConfirmationPage = (data) =>{
//       window.history.pushState({ view: 'confirmation' }, '', '/confirmation');
//       setConfirmData(data);
//       setView('confirmation');
//   }

//   const renderView = () => {
//     switch (view) {
//         case 'homepage':
//             return <HomePage navigateToApplyUrl={navigateToApplyUrl} navigateToApplyExcel={navigateToApplyExcel} />;
//         case 'applyUrl':
//             return <ApplyUrl navigateToConfirmationPage = {navigateToConfirmationPage}/>;
//         case 'applyExcel':
//             return <ApplyExcel />;
//         case 'confirmation':
//             return <ConfirmationPage data={confirmData} />;
//         default:
//             return <HomePage navigateToApplyUrl={navigateToApplyUrl} navigateToApplyExcel={navigateToApplyExcel} />;
//     }
//   };

//   return (
//     <>
//       <div>{renderView()}</div>
//     </>
//   )
// }

export default App;
