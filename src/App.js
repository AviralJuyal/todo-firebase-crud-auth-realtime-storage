import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Content from './Components/Content';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Admin from './Components/Admin';
import Developer from './Components/Developer';
import AddImg from './Components/AddImg';
import ViewImg from './Components/ViewImg';
import PhoneSign from './Components/PhoneSign';
import { useState } from 'react';


function App() {
  const [currentUser, setcurrentUser] = useState(true)

const RequireAuth =({children})=>{
 return currentUser? children:<Navigate to='/'/>
}

  return(
  <>
    <BrowserRouter>
      <Routes>

        <Route path="/home" element={<RequireAuth> <Content/> </RequireAuth>} />
        <Route path="/img" element={<RequireAuth><AddImg/></RequireAuth>} />
        <Route path="/" element={<Login setcurrentUser={setcurrentUser}/>} />
        <Route path="/signUp" element={<SignUp setcurrentUser={setcurrentUser}/>} />
        <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
        <Route path="/developer" element={<RequireAuth><Developer/></RequireAuth>} />
        <Route path="/view" element={<RequireAuth><ViewImg/> </RequireAuth>} />
        <Route path="/phoneLogin" element={<PhoneSign setcurrentUser={setcurrentUser}/>} />
    
   
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
