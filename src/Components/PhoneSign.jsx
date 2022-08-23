import React,{useState} from 'react'
import { auth } from '../firebase'
import {RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';


const PhoneSign = (props) => {
    const [wrong, setWrong] = useState(false)
    const [number, setNumber] = useState('')
    const [send, setSend] = useState(false)
    const [otp, setOtp] = useState('')
    const [confirmObj, setConfirmObj] = useState('')
    const navigate = useNavigate();

   

    const setUpRecaptcha=(number)=>{
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        recaptchaVerifier.render()
        console.log(number)
        return signInWithPhoneNumber(auth , number, recaptchaVerifier);
    }

    const handleNumber =(e)=>{
        setNumber(e.target.value);
    }

    const getOtp =async(e)=>{
        e.preventDefault();

        if(number==='' || number===undefined) {return setWrong(true)}
        try {
             const response = await setUpRecaptcha(number);
             console.log(response);
            setConfirmObj(response)
             setSend(true);
        } catch (error) {
            setWrong(true)
            console.log(error)
        }

    }
    const handleOtp =(e)=>{
        setOtp(e.target.value);
    }

    const verifyOtp =async(e)=>{
        e.preventDefault();

        // console.log(otp)
        if(otp==='' || otp===null)return
        try {
            await confirmObj.confirm(otp)
            props.setcurrentUser(true)
            navigate('/home')
        } catch (error) {
            console.log(error)
            setWrong(true);
        }
    }

  return (
    <section className="md:mt-24 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Log In with phone number</h2>
    
    <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        {  !send &&   <><div>
                      <label className="text-gray-700 dark:text-gray-200">Phone Number</label>
                      <input value={number} onChange={(e) => { handleNumber(e); } } type="tel" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                  </div>
                  <div className="flex h-11 mt-8">
                          <button onClick={(e) => { getOtp(e) } } className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Get OTP</button>
                      </div>
                      
                      <div id='recaptcha-container'/>
                      </>}


       { send && <div>
                <label className="text-gray-700 dark:text-gray-200">OTP</label>
                <input  value={otp} onChange={(e)=>{handleOtp(e)}}   type="number" className=" mb-2 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
                <button className="mb-2 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={(e)=> verifyOtp(e)}>Verify</button>
            </div>}

        </div>
         

        {wrong &&
            <span className="text-red-600"  >Invalid Number/OTP</span> 
        }
    </form>
    <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={()=>navigate('/')}>cancel</button>
    {/* <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onClick={()=>navigate('/phoneLogin')}>Sign up with phone number</button> */}

</section>
    
  )
}

export default PhoneSign