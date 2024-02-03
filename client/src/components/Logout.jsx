import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { BiPowerOff } from 'react-icons/bi'
const Logout = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <Button onClick={() => handleClick()}>
            <BiPowerOff />
        </Button>
    )
}

export default Logout

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #1f1f38;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;