import {useContext} from 'react';

import './index.css'
import { dataContext } from '../../Context/data';

const Navbar=()=>{
   
    const {data,message,setData}=useContext(dataContext);
    const sendData=async()=>{
        // console.log(data,"data from hero in navbar");
        const requiredData=data.filter(detail=>detail.check===true);
        console.log(requiredData,"neededd daat");
        const requiredDataFormat={"message":message,"details":requiredData}
        console.log(requiredDataFormat,"our format");
        const options={
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(requiredDataFormat)
        }
        console.log(options)
        const response = await fetch('http://localhost:8081/sendmsg',options);

        // if(response){
            const result= await response.json();
            console.log(result);
            const requireResult=result.isSent;
            console.log(requireResult);
            const updatedDetails=[...data];
            console.log(updatedDetails)

            requireResult.forEach(resultEntry => {

                const matchingDetailIndex = updatedDetails.findIndex(detail => detail.number === resultEntry.phone);

                if (matchingDetailIndex !== -1) {
                    updatedDetails[matchingDetailIndex].status = resultEntry.status.toUpperCase();
                }
            });

            console.log(updatedDetails,"after data sent sattusse updated")
            setData(updatedDetails);
        // }
        // else{
        //     console.log("not requested data for messaging some issues")
        // }
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