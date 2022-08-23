import { auth, db} from '../firebase';
import {uid} from 'uid';
import { set , ref, onValue, remove, update } from 'firebase/database';
import  { useState , useEffect } from 'react';
import {  onAuthStateChanged, signOut , updateProfile} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AddImg from './AddImg';
import Profile from './Profile';
// import { getToken } from '../firebase'
import Notification from './Notification';


const Content = () => {
        const navigate = useNavigate();
        const [todo, setTodo] = useState('');
        const [todos, setTodos] = useState([]);
       const [isEdit, setIsEdit] = useState(false)  
       const [addingName, setaddingName] = useState(false)  
       const [tempUuid, setTempUuid] = useState('')
       const [user, setuser] = useState('')
       const [userName, setuserName] = useState('')
       const adminUid = 'ghA2VJjFeoTFNf0reKM1AOvIqbu2';
       const developerUid = 'oNZkhZh32lQBlRu5m9AEH0ckKZJ2';
        let userId ='';
     
        // Set admin privilege on the user corresponding to uid.
        // const unsubscribe = onAuthStateChanged(auth , (data)=>{
        //   // console.log(data)
        //     setuser(data);
        //     userId = user.uid;
        //   })

    if(user.uid === adminUid)
        navigate('/admin');

    if(user.uid === developerUid)
        navigate('/developer');
    
        // console.log(user)
    
      if(user){

            // let str = user.email
            // setuserName(str.split("@")[0]);
            // userName = str.split("@")[0];
            // console.log(userName);
            userId = user.uid;
            // console.log(user.uid)
        }

        useEffect(() => {
          // console.log('hello')
          const unsubscribe = onAuthStateChanged(auth , (data)=>{
            // console.log(data)
              setuser(data);
              // userId = user.uid;
            })
          return () => {
            unsubscribe();
          }
        }, [])

        //read
        useEffect(() => {
          // console.log(userId)
          onValue(ref(db , `user/${user.uid}/`) , (snapshot)=>{
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
        }, [user.uid])
        
      
        const onChangeTodo = (e)=>{
        setTodo(e.target.value);
      }
      

      //write
        const writeToDatabase = ()=>{
          const uuid = uid();
          
          set(ref(db , `user/${userId}/${uuid}`) , {
            todo,
            uuid,
            userName:user.displayName,
            userId,
          })
          setTodo('')
        }
        
        
      //update
      const handleUpdate=(todo)=>{
        setTodo(todo.todo);
        // handleDelete(todo);
        setIsEdit(true);
        setTempUuid(todo.uuid);
        // update(ref(db,`/${todo.uuid}`),)
      }
      
      const handleSubmitChange = ()=>{
        
        update(ref(db,`user/${user.uid}/${tempUuid}`),{
          todo,
          uuid: tempUuid,
          userName:user.displayName,
          userId,
        })
      
        setTodo('')
        setIsEdit(false)
      }
      
      //delete
      const handleDelete = (todo)=>{
        // console.log(todo);

        remove(ref(db,`user/${user.uid}/${todo.uuid}`))
        setTodo('')
      }

      const handleLogout = ()=>{
        signOut(auth)
        navigate('/')
      }
      
     

      const handleUserName=async(e) => {
        e.preventDefault();
        // if(userName === ''|| userName === null) return;

       await updateProfile(user, {displayName: userName})

        setaddingName(false);
        
      }

      const handleUserNameChange=() => {
        updateProfile(user, {displayName: ''})
        setaddingName(true);
      }
      // console.log(user)
      
        return ( 
          <>
          { addingName  ? (
            <form onSubmit={(e)=> handleUserName(e)}>

            <div className="flex min-h-screen  items-center justify-center">
          <input className='h-10 w-56 mt-2 mr-2 bg-red-100 pl-2' placeholder='Enter Your UserName' onChange={(e)=>setuserName(e.target.value)} />
          <button className="px-6 h-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-3 mt-2" type='submit' >submit</button>
          </div>
          </form>

          ):
          
          <div className=''>

            <Notification/>
            
          <Profile user={user}/>
            <button onClick={handleLogout} className="bg-red-500 shadow-sm hover:bg-red-400 rounded-xl text-white px-8 py-1 mt-2 ml-2">Log Out</button> 
            <button className="px-6 h-8 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-3 mt-2" onClick={handleUserNameChange}>Change UserName</button>
            <AddImg userId={userId}/>
        <section className="md:mt-24 max-w-xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <span>User : {user.displayName===null?setaddingName(true):user.displayName}</span>

            <h2 className=" text-center text-xl font-semibold text-gray-700 capitalize dark:text-white">Tasks</h2>
            <input onChange={onChangeTodo} value={todo}  type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
    
            {isEdit?(<>
                <button onClick={handleSubmitChange}  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-3 mt-2">Save Changes</button>
                <button onClick={()=> setIsEdit(false)} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">X</button>
            </>
            ):
            (
            // <button onClick={writeToDatabase}>submit</button>
            <button onClick={writeToDatabase}  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mt-2">Submit</button>
            )
            }
            {todos.map((todo,i)=>todo.userId === userId && (
            
                <div key={i} className='my-8 mx-4 shadow-sm bg-slate-100 text-center'>
                    <label className="text-xl dark:text-gray-200 block mb-4" >{todo.todo}</label>

              <button onClick={()=> handleUpdate(todo)}  className="mr-2 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mb-3">Update</button>
              <button onClick={() => handleDelete(todo)} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mb-3">Delete</button>
            
                </div>
            
            ))}
            </section>
            
          </div>
            }
          </>

        );
      }

export default Content