import React, { useContext, useState } from "react";
import {Context} from '../Context/UserContext'

const Login = () => {
  const {error, setError} = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const token = await res.json();
    if(res.ok){
      localStorage.setItem('token', JSON.stringify(token))
    }
    else{
      setError(token.error)
      console.log(token)
    }

  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className=" border border-black px-4 py-5 rounded-lg"
        onSubmit={handelSubmit}
      >
        <div className="block mb-3">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black px-3 py-1 rounded-lg ml-4"
          />
        </div>

        <div className="block mb-3">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black px-3 py-1 ml-4 rounded-lg "
          />
        </div>
        <button className="px-4 py-2 font-bold border border-black rounded-lg text-black w-full mb-3 hover:bg-black transition-all hover:text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
