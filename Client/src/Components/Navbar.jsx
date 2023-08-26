import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/UserContext";


const Navbar = () => {
  const {user, fetchUser} = useContext(Context)
  useEffect(()=>{
    fetchUser()
  }, [])

  const token = localStorage.getItem('token')
  const handelLogout = () =>{
    localStorage.removeItem('token')
  }
  return (
    <nav className="w-full h-16 bg-slate-500 flex justify-between items-center px-4">
      <Link to={"/"} className="text-3xl font-bold text-white">
        Coding BLog
      </Link>
      {token? <div className="flex items-center justify-center">
      <p className="text-white font-semibold text-xl mr-2">{user}</p>
        <div className="px-4 py-2 font-bold border border-white rounded-lg text-white mr-3 cursor-pointer" onClick={handelLogout}>Logout</div>
      </div>: <div className="">
        <Link
          to={"/login"}
          className="px-4 py-2 font-bold border border-white rounded-lg text-white mr-3"
        >
          Login
        </Link>
        <Link
          to={"/signup"}
          className="px-4 py-2 font-bold border border-white rounded-lg text-white"
        >
          Signup
        </Link>
      </div>}
    </nav>
  );
};

export default Navbar;
