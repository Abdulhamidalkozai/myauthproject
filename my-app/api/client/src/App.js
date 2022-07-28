import logo from './logo.svg';
import './App.css';
import Login from './LogReg/Login';
import Navbar from './Nav/Navbar';
import { useContext } from "react";
import { Context } from "../src/context/Context";



function App() {
  const { user, dispatch } = useContext(Context);
  return (
   <>

   <Navbar/>
   {user?<p></p>:<Login/>}
   
   </>
    


  );
}

export default App;
