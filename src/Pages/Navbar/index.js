import {useContext} from 'react';

import './index.css'
import { dataContext } from '../../Context/data';
import { baseUrl } from '../../utils/util';

const Navbar=()=>{
   
    const {details,message,attachFile,setDetails}=useContext(dataContext);
    const sendData=async()=>{
        // console.log(data,"data from hero in navbar");
        const requiredData=details.filter(detail=>detail.check===true);
        console.log(requiredData,"neededd daat");
        const requiredDataFormat={"message":message,"details":requiredData}
        console.log(requiredDataFormat,"our format");

        if(attachFile ===null){ // no file is attached
            const options={
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(requiredDataFormat)
            }
            console.log(options)
            const response = await fetch(baseUrl+'sendmsg',options);
    
            // if(response){
                const result= await response.json();
                console.log(result);
                const requireResult=result.isSent;
                console.log(requireResult);
                const updatedDetails=[...details];
                console.log(updatedDetails)
    
                requireResult.forEach(resultEntry => {
    
                    const matchingDetailIndex = updatedDetails.findIndex(detail => detail.number === resultEntry.phone);
    
                    if (matchingDetailIndex !== -1) {
                        updatedDetails[matchingDetailIndex].status = resultEntry.status.toUpperCase();
                    }
                });
    
                console.log(updatedDetails,"after data sent sattusse updated")
                setDetails(updatedDetails);
            // }
            // else{
            //     console.log("not requested data for messaging some issues")
            // }
        }
        else{ // a file is attached
            const formData=new FormData();
            console.log(attachFile)
            formData.append('message',message)
            formData.append('file',attachFile)
            formData.append('details',requiredData)

            const options={
                method:"POST",
                headers:{
                    'Content-Type':'multipart/form-data',
                },
                body:formData
            }
            console.log(options)
            try{
                const response = await fetch('http://localhost:8081/sendfilemsg',options);
        
                const result= await response.json();
                console.log(result);
                const requireResult=result.isSent;
                console.log(requireResult);
                const updatedDetails=[...details];
                console.log(updatedDetails)
    
                requireResult.forEach(resultEntry => {
    
                    const matchingDetailIndex = updatedDetails.findIndex(detail => detail.number === resultEntry.phone);
    
                    if (matchingDetailIndex !== -1) {
                        updatedDetails[matchingDetailIndex].status = resultEntry.status.toUpperCase();
                    }
                });
    
                console.log(updatedDetails,"after data sent with file sattusse updated")
                setDetails(updatedDetails);  
            }
            catch (e){
                console.log(e,e.message,"hera llsdvr")
            }
              
        }

    }

    return(
        <div className="navbar-container">
            <h3 className='navbar-title'>JS WA Sender</h3>
            <span className='navbar-right'>
                <button className='filter-btn btn'>FILTER</button>
                <button className='send-btn btn' onClick={sendData}>SEND</button>
            </span>
        </div>
    )
}

export default Navbar;