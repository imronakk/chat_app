import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'

import logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {

  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmpwd: "",
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      const { name, email, password, confirmpwd } = value;
      const {data} = await axios.post(registerRoute,{
        name,
        email,
        password
      })
      if(data.status === false){
        return toast.error(data.msg , toastOptions)
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const handleValidation = () => {
    const { name, email, password, confirmpwd } = value;

    if (password !== confirmpwd) {
      toast.error("Password and Confirm Password should be the same. ", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("User Name should be greater than 3 characters. ", toastOptions);
      return false;
    } else if (email === '') {
      toast.error("Email is Required. ", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error("Password should be greater than 5 characters. ", toastOptions);
      return false;
    }else{
    return true;
    }
  }


  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(e) => handleSubmit(e)}>

          <div className="brand">
            <img src={logo} alt="" />
            <h1>Ronak</h1>
          </div>

          <input type='text' placeholder='Username' name='name' onChange={(e) => handleChange(e)} />
          <input type='email' placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
          <input type='password' placeholder='password' name='password' onChange={(e) => handleChange(e)} />
          <input type='password' placeholder='Confirm password' name='confirmpwd' onChange={(e) => handleChange(e)} />

          <button type='submit'>Create User </button>
          <span>Alredy Have an Account ? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #2a2a39;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #3e3a4a;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #574a7e;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #766e8e;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register
