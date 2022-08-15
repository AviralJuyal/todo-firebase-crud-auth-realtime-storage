import {auth, db} from '../firebase';
import {uid} from 'uid';
import { set , ref, onValue, remove, update } from 'firebase/database';
import  { useState , useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Content = () => {
        const navigate = useNavigate();
        const [todo, setTodo] = useState('');
        const [todos, setTodos] = useState([]);
       const [isEdit, setIsEdit] = useState(false)  
       const [tempUuid, setTempUuid] = useState('')
       const [user, setuser] = useState('')
       const adminUid = 'ghA2VJjFeoTFNf0reKM1AOvIqbu2';
       const developerUid = 'oNZkhZh32lQBlRu5m9AEH0ckKZJ2' ;
        let userName='';

    if(user.uid === adminUid)
        navigate('/admin');

    if(user.uid === developerUid)
        navigate('/developer');

        if(user){

            let str = user.email
            // setuserName(str.split("@")[0]);
            userName = str.split("@")[0];
            // console.log(userName);
        }

        //read
        useEffect(() => {
            
          onValue(ref(db) , (snapshot)=>{
            setTodos([]);
            const data = snapshot.val();
            // console.log(data);
            if(data !== null){
                
              // console.log(Object.values(data))
               Object.values(data).map(todo=>{
                // console.log(todo.userName);
                // console.log(userName);
                // if(todo.userName === userName)
                setTodos( oldArray =>[...oldArray , todo]);
               });
      
            }
          });
        }, [])
        
      
        const onChangeTodo = (e)=>{
        setTodo(e.target.value);
      }
      
      //write
        const writeToDatabase = ()=>{
          const uuid = uid();
          set(ref(db , `/${uuid}`) , {
            todo,
            uuid,
            userName,
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
        update(ref(db,`/${tempUuid}`),{
          todo,
          uuid: tempUuid,
        })
      
        setTodo('')
        setIsEdit(false)
      }
      
      //delete
      const handleDelete = (todo)=>{
        // console.log(todo);

        remove(ref(db , `/${todo.uuid}`))
        setTodo('')
      }

      const handleLogout = ()=>{
        signOut(auth)
        navigate('/')
      }
      
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , (data)=>{
            setuser(data);
          })
        return () => {
          unsubscribe();
        }
      }, [])
      
      
        return (
          <div >
            <button onClick={handleLogout} className="bg-red-500 shadow-sm hover:bg-red-400 rounded-xl text-white px-8 py-1 mt-2 ml-2">Log Out</button> 
        <section class="md:mt-24 max-w-xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <span>User : {userName}</span>
            <h2 class=" text-center text-xl font-semibold text-gray-700 capitalize dark:text-white">Tasks</h2>
            <div  >

            <input onChange={onChangeTodo} value={todo}  type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            {/* <input onChange={onChangeTodo} value={todo} type="text" /> */}
            {isEdit?(<>
                <button onClick={handleSubmitChange}  class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mr-3 mt-2">Save Changes</button>
                <button onClick={()=> setIsEdit(false)} class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">X</button>
            {/* <button onClick={handleSubmitChange}>save changes</button>
            <button onClick={()=> setIsEdit(false)}>X</button> */}
            </>
            ):
            (
            // <button onClick={writeToDatabase}>submit</button>
            <button onClick={writeToDatabase}  class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mt-2">Submit</button>
            )
            }
            {todos.map(todo=>todo.userName=== userName && (
            //   <>
                <div className='my-8 mx-4 shadow-sm bg-slate-100 text-center'>
                    <label class="text-xl dark:text-gray-200 block mb-4" for="password">{todo.todo}</label>
              {/* <h1 class=" text-base font-semibold text-gray-700 capitalize dark:text-white">{todo.todo}</h1> */}
              {/* <button onClick={()=> handleUpdate(todo)}>Update</button> */}

              <button onClick={()=> handleUpdate(todo)}  class="mr-2 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mb-3">Update</button>
              <button onClick={() => handleDelete(todo)} class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mb-3">Delete</button>
              
              {/* <button onClick={() => handleDelete(todo)}>delete</button> */}
                </div>
            //   </>
            ))}
            </section>
          </div>
        );
      }

export default Content