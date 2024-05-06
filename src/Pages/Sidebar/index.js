import {useContext} from 'react';

import './index.css';
import { dataContext } from '../../Context/data';

const Sidebar=()=>{
    const {setDisplayDataModel}=useContext(dataContext);

    return(
        <div className="sidebar-container">
            <button className="sidebar-option" onClick={()=>{setDisplayDataModel(s=>!s)}}>Import Data</button>
            <button className="sidebar-option">Report</button>
            <button className="sidebar-option">Settings</button>
        </div>
    )
}

export default Sidebar;