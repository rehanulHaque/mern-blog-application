import React, { useContext } from 'react'
import { Context } from "../Context/UserContext";

const Blog = () => {
    const { singleBlog, setError, fetchAllBlogs } = useContext(Context);
    const {title, description, _id} = singleBlog
    const handelDelete = async (id)=>{
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/blog/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      })
      const data = await response.json()
      if(response.ok){
          fetchAllBlogs()
      }else{
        setError(data.error)
      }
    }
  return (
    <div className='mx-8 my-10'>
        <h1 className='font-bold text-2xl mb-7'>{title}</h1>
        <p className=''>{description}</p>
        <button className='px-4 py-2 border border-black font-semibold rounded-lg mt-8' onClick={()=> handelDelete(_id)}>Delete</button>
    </div>
  )
}

export default Blog
