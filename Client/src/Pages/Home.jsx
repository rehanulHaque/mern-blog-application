import React, { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { Context } from "../Context/UserContext";

const Home = () => {
  const [content, setContent] = useState({ title: "", description: "" });
  const { blogs, fetchAllBlogs, fetchSingleBlog, setError } = useContext(Context);
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch("http://localhost:3000/blog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token.token}`,
      },
      body: JSON.stringify(content),
    });

    const data = await response.json();
     if(response.ok){
       fetchAllBlogs()
     }else{
      setError(data.error)
     }
  };

  const handelTitleChange = (e) => {
    setContent((prevdata) => ({
      ...prevdata,
      title: e.target.value,
    }));
  };
  const handelDescriptionChange = (e) => {
    setContent((prevdata) => ({
      ...prevdata,
      description: e.target.value,
    }));
  };

  const handelClick =(id) =>{
    fetchSingleBlog(id)
  }
  return (
    <div className="mx-8 my-10 flex justify-between ">
      <div className="">
        {blogs &&
          blogs.map((e) => {
            return (
              <div className="border border-black px-3 py-2 mb-4 rounded-lg mr-4 " key={e._id}>
                <h1 className="font-bold text-2xl">{e.title}</h1>
                <p>{e.description.substring(0, 100)}<Link to={'/blog'} onClick={()=> handelClick(e._id)} className="text-blue-700">...Read More</Link></p>
              </div>
            );
          })}
      </div>

      <div className="">
        <form onSubmit={handelSubmit}>
          <div className="">
            <label htmlFor="title">Title :</label>
            <input
              type="text"
              name="title"
              onChange={(e) => handelTitleChange(e)}
              value={content.title}
              className="border border-black px-3 py-1 rounded-lg mb-2 ml-1 w-full"
            />
          </div>
          <div className="">
            <label htmlFor="description">Description :</label>
            <input
              type="text"
              name="description"
              onChange={(e) => handelDescriptionChange(e)}
              value={content.description}
              className="border border-black px-3 py-1 rounded-lg mb-2 ml-1 w-full"
            />
          </div>
          <button className="border border-black px-3 py-1 rounded-lg w-full font-semibold">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
