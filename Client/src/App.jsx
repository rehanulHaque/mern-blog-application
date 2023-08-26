import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Blog from './Pages/Blog'
import { useContext, useEffect } from "react";
import {Context} from './Context/UserContext'
import Error from "./Components/Error";

function App() {
  const {error, setError} = useContext(Context)
  const token = localStorage.getItem('token')

  return (
    <>
      <Navbar />
      {error && <Error/>}
      {/* <Error/> */}
      <Routes>
        <Route path="/" element={token ? <Home />: <Navigate to='/login'/>} />
        <Route path="/blog" element={token ? <Blog />: <Navigate to='/login'/>} />
        <Route path="/login" element={!token ? <Login />: <Navigate to='/'/>} />
        <Route path="/signup" element={!token ? <Signup />: <Navigate to='/'/>} />
      </Routes>
    </>
  );
}

export default App;
