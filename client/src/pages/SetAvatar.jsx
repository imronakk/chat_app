import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Buffer } from "buffer";

import Loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from '../utils/APIRoutes';

const SetAvatar = () => {
    const api = 'https://api.multiavatar.com/45678912';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const image = await axios.get(
                        `${api}/${Math.round(Math.random() * 1000)}`
                    );
                    const buffer = Buffer.from(image.data, 'base64');
                    { console.log('SVG Content:', image.data) }

                    data.push(buffer);
                }
                // console.log(data)
                setAvatars(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData(); // Call the async function immediately
    }, []);

    

    return (
        <>
            <Container>
                <div className="title-containers">
                    <h1>Pick an avatar.</h1>
                </div>
                <div className="avatars">
                    {avatars.map((avatar, index) => {
                        

                        return (

                        <div className={`avatar ${selectedAvatar === index ? 'selected' : ''}`} key={index}>
                            <img
                                src={`data:image/svg+xml;base64,${avatar}`}
                                // src={URL.createObjectURL(new Blob([avatar], { type: 'image/svg+xml' }))}
                                alt="avatar"
                                onClick={() => setSelectedAvatar(index)}
                            />
                                {console.log(avatar)}
                        </div>
                        
                    )})}
                    
                </div>
            </Container>
            <ToastContainer />
        </>
    );
};

const Container = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }`;

export default SetAvatar;
