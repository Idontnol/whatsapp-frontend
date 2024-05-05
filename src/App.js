import {useState,useEffect} from 'react';
import './App.css';
import Navbar from './Pages/Navbar';
import Sidebar from './Pages/Sidebar';
import Hero from './Pages/Hero';
import { dataContext } from './Context/data';

function App() {
  const [data,setData]=useState([
            {name:'charan',number:'9989786348',check:false,status:"NILL"},
            {name:'chard',number:'8309370811',check:false,status:"NILL"},
            {name:'ruhi',number:'8008717091',check:false,status:"NILL"},
            {name:'mahesh',number:'80087172091',check:false,status:"NILL"},
            {name:'janu',number:'8978673461',check:false,status:"NILL"},
            {name:'meena',number:'8712106829',check:false,status:"NILL"},
            {name:'raju',number:'8978173461',check:false,status:"NILL"},
            {name:'sriman',number:'9478673461',check:false,status:"NILL"},
            {name:'subha',number:'7674083953',check:false,status:"NILL"}]);
  const [message,setMessage]=useState("");

  useEffect(() =>{
    const getData=async()=>{
        console.log(data);
    }
    getData();
  },[data])

  return (
    <div className="App">
      <dataContext.Provider value={{setData,data,message,setMessage}}>
        <Navbar/>
        <div className='main-page'>
          <Sidebar/>
          <Hero/>
        </div>
      </dataContext.Provider>
    </div>
  );
}

export default App;
