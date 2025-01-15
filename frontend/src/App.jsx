// dependencies
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';

// pages
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';

// components

import './App.css'

function App() {
  console.log("Server hosted at: " + import.meta.env.VITE_SERVER_URL);
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<UserDashboard />} />
      </Routes>
    </>
  )
}

export default App
