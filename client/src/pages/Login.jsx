import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'

import logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {

  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    password: ""
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
    if (handleValidation()) {
      const { name, password } = value;
      const { data } = await axios.post(loginRoute, {
        name,
        password
      })
      if (data.status === false) {
        return toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const handleValidation = () => {
    const { name, password } = value;

    if (password === '') {
      toast.error("Username and password are required. ", toastOptions);
      return false;
    } else if (name === '') {
      toast.error("Username and password are required. ", toastOptions);
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [navigate])


  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(e) => handleSubmit(e)}>

          <div className="brand">
            <img src={logo} alt="" />
            <h1>Chat App</h1>
          </div>

          <input type='text' placeholder='Username' name='name' onChange={(e) => handleChange(e)} />
          <input type='password' placeholder='password' name='password' onChange={(e) => handleChange(e)} />

          <button type='submit'>Login </button>
          <span>Don't Have an Account ? <Link to="/register">Regsiter</Link></span>
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
export default Login
