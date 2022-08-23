import React,{useState} from 'react'
import { auth } from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {  useNavigate,Link } from 'react-router-dom';


const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrong, setWrong] = useState(false);

    const navigate = useNavigate()

    const handleLogin = (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            props.setcurrentUser(true)
          navigate('/home');
            
        })
        .catch((error) => {
          setWrong(true);
          console.log(error);
          alert(error)
        });
    }

    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

  return (
    <>  
        {/* <input type="email" value={email} onChange={(e)=>{handleEmail(e)}} placeholder='Enter Your Email'/>
        <input type="text" value={password} onChange={(e)=>{handlePassword(e)}} placeholder='Enter Your Password'/> <br />
        <button onClick={handleLogin}>Create </button> <br />
        <span>Already have a account  <Link to='/'>Click here !!</Link></span> */}

<section className="md:mt-24 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Create Account</h2>
        
        <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className="text-gray-700 dark:text-gray-200" >Email Address</label>
                    <input value={email} onChange={(e)=>{handleEmail(e)}} type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" >Password</label>
                    <input  value={password} onChange={(e)=>{handlePassword(e)}}   type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                </div>

                
            </div>

            <div className="flex justify-end mt-6">
                <button onClick={(e)=>{handleLogin(e)}} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Create Account</button>
            </div>
            {wrong &&
                <span className="text-red-600"  >Invalid Email/Password</span> 
            }
        </form>
        <span>Already have a account <Link to='/' className=' underline hover:decoration-blue-500'>Click here !!</Link></span>

    </section>

    </>
  )
}

export default SignUp