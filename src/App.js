import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from './Components/Content';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Admin from './Components/Admin';
import Developer from './Components/Developer';

function App() {
  return(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Content/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/developer" element={<Developer/>} />
    
   
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
