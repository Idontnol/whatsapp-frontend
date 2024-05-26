import {useState,useEffect} from 'react';
import './App.css';
import Navbar from './Pages/Navbar';
import Sidebar from './Pages/Sidebar';
import Hero from './Pages/Hero';
import { dataContext } from './Context/data';
import DataModel from './Pages/DataModel';

function App() {
  const [data,setData]=useState([
            {name:'charan',number:'9989786348',check:false,status:"NILL"},
            {name:'chard',number:'8309370811',check:false,status:"NILL"},
            {name:'ruhi',number:'8008717091',check:false,status:"SUCCESS"},
            {name:'mahesh',number:'80087172091',check:false,status:"FAILURE"},
            {name:'janu',number:'8978673461',check:false,status:"NILL"},
            {name:'raju',number:'8978173461',check:false,status:"NILL"},
            {name:'sriman',number:'9478673461',check:false,status:"NILL"},
            {name:'subha',number:'7674083953',check:false,status:"NILL"}]);

  const [message,setMessage]=useState("");
  const [attachFile,setAttachFile]=useState(null);
  const [details,setDetails]=useState([]);
  const[displayDataModel,setDisplayDataModel]=useState(false);

  useEffect(() =>{
    const getData=async()=>{
        console.log(data);
    }
    getData();
  },[data])

  return (
    <div className="App">
      <dataContext.Provider value={{setData,data,message,setMessage,details,setDetails,displayDataModel,setDisplayDataModel,attachFile,setAttachFile}}>
        <Navbar/>
        <div className='main-page'>
          <Sidebar/>
          <Hero/>
        </div>
        <DataModel  />
      </dataContext.Provider>
    </div>
  );
}

export default App;
