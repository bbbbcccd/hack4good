// dependencies
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';

// pages
import Login from './pages/Login';
import Users from './pages/users/Users';
import UserDashboard from './pages/UserDashboard';
import MinimartPage from './pages/MinimartPage'

// components
import Navbar from './components/Navbar';

import './App.css'

function App() {
  console.log("Server hosted at: " + import.meta.env.VITE_SERVER_URL);
  axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
  axios.defaults.withCredentials = true;

  return (
    <>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/minimart' element={<MinimartPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
