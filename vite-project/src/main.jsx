import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/auth.jsx'//so that context api can be use by everyone
import {ToastContainer} from 'react-toastify';//so that toast popup use by everyone
import "react-toastify/dist/ReactToastify.css";//css added to toastify for better look

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  <AuthProvider>
    <App />
   <ToastContainer
   position="top-right"
   autoClose={3000}
   hideProgressBar={false}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   pauseOnFocusLoss
   draggable
   pauseOnHover
   theme="light"
   bodyClassName="toastBody"/>

  </AuthProvider>
  </React.StrictMode>
 
)
