import {useContext} from 'react';

import './index.css';
import { dataContext } from '../../Context/data';
import { baseUrl } from '../../utils/new';

const Sidebar=()=>{
    const {setDisplayDataModel}=useContext(dataContext);
    const whatsappLogin =async()=>{
        const response=  await fetch(baseUrl+'/openwhatsapp');
        const result= await response.json();
        console.log(result);
    }

    return(
        <div className="sidebar-container">
            <button className='sidebar-option' onClick={()=>{whatsappLogin()}}>Whatsapp Signin</button>
            <button className="sidebar-option" onClick={()=>{setDisplayDataModel(s=>!s)}}>Add Data</button>
            <button className="sidebar-option">Report</button>
            <button className="sidebar-option">Settings</button>
        </div>
    )
}

export default Sidebar;