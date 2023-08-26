import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState({});
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const fetchAllBlogs = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch("http://localhost:3000/blog/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    const data = await response.json();
    setBlogs(data);
  };

  const fetchSingleBlog = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`http://localhost:3000/blog/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    const data = await response.json();
    setSingleBlog(data);
  };
  const fetchUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(`http://localhost:3000/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data.email);
    } else {
      setError(data.error);
    }
  };

  return (
    <Context.Provider
      value={{
        blogs,
        fetchAllBlogs,
        singleBlog,
        fetchSingleBlog,
        error,
        setError,
        user,
        fetchUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
