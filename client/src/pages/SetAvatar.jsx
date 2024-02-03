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
  const api = 'https://api.multiavatar.com/45678919';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login')
    }
  }, [])

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem('chat-app-user'))
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isImageAvatar = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user',
          JSON.stringify(user)
        );
        navigate('/');
      } else {
        toast.error('Error setting avatar please try again', toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const svgContent = response.data; // SVG content as a string
          data.push(svgContent);
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoading]);

  return (
    <>
      {
        isLoading ? <Container>
          <img src={Loader} alt="Loader" className='loader' />
        </Container> : (


          <Container>
            <div className="title-container">
              <h1>Pick an avatar.</h1>
            </div>
            <div className="avatars">
              {avatars.map((svgContent, index) => (
                <div
                  className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                  key={index}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img
                    src={`data:image/svg+xml,${encodeURIComponent(svgContent)}`}
                    alt="avatar"
                  />
                </div>
              ))}
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set As Profile Picture</button>
          </Container>
        )
      }
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
