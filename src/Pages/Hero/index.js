import {useState,useContext,useEffect} from 'react';
// import { IoAddCircleSharp } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './index.css';
import * as XLSX from 'xlsx';
import { dataContext } from '../../Context/data';

const Hero=()=>{
    const {data,setMessage,message,details,setDetails,setAttachFile}=useContext(dataContext)
    // const [details,setDetails]=useState(data);

    
    const [checkAll,setCheckAll]=useState(false);

    useEffect(()=>{
        setDetails(data);
        console.log('times')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

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
        setAttachFile(file)
      };
    
      const generatePDF = async () => {
        let requiredData=details.filter(obj=>obj.check===true);
        requiredData=requiredData.map(dat=>({name:dat.name,number:dat.number,status:dat.status}))
        const doc = new jsPDF();
        const docWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const headerFontSize = 17;
        // const rowHeight = 10;
    
        // Header
        doc.setFontSize(headerFontSize);
        doc.text('WhatsApp Message Delivery Report', margin, margin + headerFontSize);
        doc.line(margin, margin + headerFontSize + 5, docWidth - margin, margin + headerFontSize + 5);
    
        // Column definitions (adjust column widths as needed)
        const columns = [
          { title: 'Name', dataKey: 'name', width: docWidth / 3 },
          { title: 'Number', dataKey: 'number', width: docWidth / 3 },
          { title: 'Status', dataKey: 'status', width: docWidth / 3 },
        ];
    
        // Table generation using jsPDF-autotable
        const tableProps = {
          startY: margin * 2 + headerFontSize + 10,
          theme: 'grid',
          columnStyles: { cellPadding: 5 },
          columns,
        };
        doc.autoTable(columns, requiredData, tableProps);
        doc.save('messagesDeliveryReport.pdf');
       };

        const exportExcel=()=>{
            let requiredData=details.filter(obj=>obj.check===true);
            requiredData=requiredData.map(dat=>({name:dat.name,number:dat.number,status:dat.status}))
            const sheet = requiredData.map((row) => Object.values(row)); // Extract values
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(sheet);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts'); // Sheet name
            XLSX.writeFile(workbook, 'deliveryReport.xlsx');
        }
      

    return(
        <div className="hero-container">
            <button className="message-btn">MESSAGE</button>
            <div className="choose-data">
                <input type="" className="message-box" onChange={(e)=>{setMessage(e.target.value)}} value={message} placeholder="Write your message here"/>
                <div className="collect-data">
                    <button className="attach-btn">Attachment</button>
                    <div class="file-input">
                        <label class="custom-file-upload">
                            <input type="file" onChange={handleFileChange} />
                            Browse
                        </label>
                    </div>
                </div>
                <div className="collect-data">
                <button className="export-option" onClick={exportExcel} disabled={false}>EXCEL <FaSave className='save-option' /></button>
                    <button className="export-option" onClick={generatePDF} disabled={false}>PDF <FaSave className='save-option' /></button>
                </div>
                
            </div>
            <div className="table-header">
                <span className='table-cell'>NAME</span>
                <span className='table-cell'>NUMBER</span>
                <label className='table-cell' htmlFor='checkbox-header'>ALL<input type="checkbox" onChange={handleAllCheckBoxes} id="checkbox-header" /></label>
                <span className='table-cell'>STATUS</span>
            </div>
            {details && <div className='table-footer'>
                {details.map((detail,index)=>{
                    const {name,number,check="TRUE",status="NILL" }= detail;
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