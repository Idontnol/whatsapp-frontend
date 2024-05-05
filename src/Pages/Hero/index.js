import {useState,useContext,useEffect} from 'react';

import './index.css'
import { dataContext } from '../../Context/data';

const Hero=()=>{
    const {data,setData,setMessage,message}=useContext(dataContext)
    const [details,setDetails]=useState(data);
    
    const [checkAll,setCheckAll]=useState(false);


    useEffect(()=>{
        setData(details);
        console.log('times')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[details])

    const handleCheckboxChange = (index) => (event) => {
        const updatedDetails = [...details];
        updatedDetails[index] = {
            ...updatedDetails[index],
            check: event.target.checked
        };
        setDetails(updatedDetails);
      };

    const handleAllCheckBoxes=()=>{
       setCheckAll(l=>!l);
       const updatedDetails = [...details];
       updatedDetails.forEach((item)=>{item.check=!checkAll});
       console.log(updatedDetails,"checkAll");
       setDetails(updatedDetails);
    }

    const handleFileChange = (event) => {
        
        const file = event.target.files[0];
        console.log(file)

        // ExcelJS.xlsx(file).then((data) => {
        //   // Process the parsed data
        //   const worksheet = data.sheets[data.sheetNames[0]]; // Get first worksheet
        //   const parsedDetails = worksheet.data.slice(1); // Skip header row
        //   console.log(parsedDetails,"given data");
        // //   setDetails(parsedDetails); // Update state with parsed data
        // }).catch((error) => {
        //   console.error(error); // Handle errors
        // });
      };
      

    return(
        <div className="hero-container">
            <button className="message-btn">MESSAGE</button>
            <div className="choose-data">
                <input type="" className="message-box" onChange={(e)=>{setMessage(e.target.value)}} value={message} placeholder="Write your message here"/>
                <div className="collect-data">
                    <button className="attach-btn">Attachment</button>
                    <div class="file-input">
                        <label class="custom-file-upload">
                            <input type="file" onchange={handleFileChange} />
                            Browse
                        </label>
                    </div>
                </div>
            </div>
            <div className="table-header">
                <span className='table-cell'>NAME</span>
                <span className='table-cell'>NUMBER</span>
                <label className='table-cell' htmlFor='checkbox-header'>ALL<input type="checkbox" onChange={handleAllCheckBoxes} id="checkbox-header" /></label>
                <span className='table-cell'>STATUS</span>
            </div>
            {details && <div >
                {details.map((detail,index)=>{
                    const {name,number,check,status }= detail;
                    return(<div className='table-values'>
                        <span className='table-cell-values'>{name}</span>
                    <span className='table-cell-values'>{number}</span>
                    <label className='table-cell-values' htmlFor={`${number}-${index}`}><input id={`${number}-${index}`} type="checkbox" checked={check} onChange={handleCheckboxChange(index)} /> </label>
                    <span className={`table-cell-values ${status==="SUCCESS" && 'success-message'} ${status==="FAILURE"&& 'failure-message'}`} >{status}</span></div>
                    )
                })}
            </div>}
        </div>
    )
}

export default Hero;