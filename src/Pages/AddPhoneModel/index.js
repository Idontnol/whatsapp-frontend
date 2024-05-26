import {useContext,useState} from 'react';
import { IoCloseSharp } from "react-icons/io5";
import Papa from 'papaparse';
import './index.css'
import { dataContext } from '../../Context/data';

const AddPhoneModel=()=>{
    

    return(
        <>
        {displayDataModel&& 
            <div className='datamodel-outer'>
                <div className={`datamodel-container`}>
                    <div className='dataModelClose'><IoCloseSharp style={{height:"28px",width:"30px",cursor:"pointer"}} onClick={()=>{setDisplayDataModel(false)}} /> </div>
                    <h3 className='' style={{color:"brown"}}>Upload the Data through Excel Sheet</h3>
                    <input type="file" accept=".xlsx, .xls" onChange={handleExcelFile} />
                    
                    <h3 className=''  style={{color:"brown"}}>Get the data through API</h3>
                    <input type="text" placeholder="Enter the API" className='apiEnter' />
                </div>
            </div>
        }
        </>
    )
}

export default AddPhoneModel;