// dependencies
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';

// pages
import Login from './pages/Login';
import Users from './pages/users/Users';

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
        <Route path='/users' element={<Users/>}/>
      </Routes>
    </>
  )
}

export default App
