import React from 'react'
import {  signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Developer = () => {
    const navigate = useNavigate();

    const handleLogout = ()=>{
        signOut(auth)
        navigate('/') 
      }
      

  return (
    <>
        <button onClick={handleLogout} className="bg-red-500 shadow-sm hover:bg-red-400 rounded-xl text-white px-8 py-1 mt-2 ml-2">Log Out</button> 
        <div>Developer</div>
    </>
  )
}

export default Developer;