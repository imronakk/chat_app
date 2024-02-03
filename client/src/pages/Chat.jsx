import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUserRoutes, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const [isloaded, setIsloaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem('chat-app-user')) {
          navigate('/login');
        } else {
          const user = await JSON.parse(localStorage.getItem('chat-app-user'));
          setCurrentUser(user);
          setIsloaded(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [navigate])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser])

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          if (currentUser.isImageAvatar) {
            const data = await axios.get(`${allUserRoutes}/${currentUser._id}`);

            setContacts(data.data);
          } else {
            navigate('/setAvatar');
          }
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [currentUser, navigate])

  const handleChatChanges = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} handleChatChanges={handleChatChanges} />
        {isloaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #2e2d3d;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`


// background-color: #00000076;