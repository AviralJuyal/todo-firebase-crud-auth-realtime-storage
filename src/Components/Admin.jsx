import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {  auth, db } from '../firebase';
import {  onValue, query, ref } from 'firebase/database';
 


const Admin = () => {
    const navigate = useNavigate();
    // const [user, setuser] = useState('')
    const [todos, setTodos] = useState([]);
   
  

    const handleLogout = ()=>{
        signOut(auth)
        navigate('/')
      }

      useEffect(() => {

        const que = query(ref(db))
        // const que = query(ref(db), limitToFirst(4))

        onValue(que , (snapshot)=>{
          setTodos([]);
          const data = snapshot.val();
          // console.log(data);

          if(data !== null){                
            // console.log(Object.values(data))
             Object.values(data).forEach(todo=>{
              // console.log(todo.userName); 
              // console.log(userName);
              // if(todo.userName === userName)
              setTodos( oldArray =>[...oldArray , todo]);
             });
    
          }
        });

        const unsubscribe = onAuthStateChanged(auth , (data)=>{
            // setuser(data);
            // updateProfile(user, {displayName: 'admin'})
          })
        return () => {
          unsubscribe();
        }
      }, [])
      

      // console.log(user)
  return (
    <>
        <button onClick={handleLogout} className="bg-red-500 shadow-sm hover:bg-red-400 rounded-xl text-white px-8 py-1 mt-2 ml-2">Log Out</button> 
        <div>
        {todos.map((todo,i)=> {
    // const imageListRef = ref(storage , `dp-/${todo.userId}`);
    // const temp = ()=>{
     
            return(
            <div key={i} className='my-8 mx-4 shadow-sm bg-slate-100 text-center'>
                <label className="text-xl dark:text-gray-200 block mb-4" >task : {todo.todo}</label>
                <span>user : {todo.userName}</span> <br />
                <span>user Id: {todo.userId}</span> <br />                
                <br />
                <button>Make Developer</button>

          {/* <button onClick={()=> handleUpdate(todo)}  className="mr-2 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mb-3">Update</button> */}
          {/* <button onClick={() => handleDelete(todo)} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mb-3">Delete</button> */}
        
            </div>
        
        )})}

        <div>
          <h1>Add Your Todos</h1>
          {/* <Content/> */}
        </div>
        </div>
    </>
  )
}

export default Admin