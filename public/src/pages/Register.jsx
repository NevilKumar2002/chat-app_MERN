import React, { useState, useEffect } from "react";
import axios from 'axios';
// import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // No need to include this
import { registerRoute } from "../utils/APIRoutes";
import "./style.css";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
   
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    // alert(...values);
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 5) {
      toast.error(
        "Password should be equal or greater than 5 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
   
    return true;
   
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      console.log("data", data)

      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.status === true) {
        
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(data.user)
        );
        
          
        navigate("/setAvatar");
      
      
      }
      toast.success('🦄 Congratulations Your Profile has been created', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
   
    }
    
  };

  return (
    <>
    
     <div className="form-container">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
        </div>
      <ToastContainer />
    </>
  );
}










// import React from "react";
// function Register(){
//   return(
//     <div>
//       Hello World Register Page
//     </div>
//   )
// }
// export default Register;