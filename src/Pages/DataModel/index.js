import {useContext,useState} from 'react';
import * as ExcelJS from 'exceljs';
import { IoCloseSharp } from "react-icons/io5";
import Papa from 'papaparse';
import './index.css'
import { dataContext } from '../../Context/data';

const DataModel=()=>{
    const {setData,data,displayDataModel,setDisplayDataModel}=useContext(dataContext);
    const [excelData,setExcelData]=useState([]);
    const [csvData,setCsvData]=useState([]);

    const handleExcelFile=async(event)=>{
        const file=event.target.files[0];
        console.log(file);

        const workbook = new ExcelJS.Workbook();
    
        await workbook.xlsx.load(file);
        
        const sheet = workbook.getWorksheet(1);
        const data = [];

        sheet.eachRow((row, rowNumber) => {
            const rowData = [];
            row.eachCell((cell) => {
              rowData.push(cell.value);
            });
            data.push(rowData);
          });
      
          setExcelData(data);
          console.log(data,"excel data end");
          console.log(excelData);
    }

    const handleCsvFile=(event)=>{
        const file=event.target.files[0];
        Papa.parse(file, {
            header: false, // Treat the first row as headers (optional)
            skipEmptyLines: true, // Skip empty lines (default: false)
            delimiter: ',', // Specify delimiter (default: ',')
            complete: (results) => {
                const parsedData = results.data.map((row) => ({
                    name: row[0],
                    number: row[1],
                    check: row[2] === 'true', // Convert string to boolean
                    status: row[3],
                  }));
                  setCsvData(parsedData);
              // Update data state with parsed data
         
            },
            error: (error) => {
              console.error('Error:', error);
            },
          });
    }

    const handleUseExcel=()=>{
        const excelDataFormat= excelData.map(row=>{return{"name":row[0],"number":row[1],"check":row[2],"status":row[3].toUpperCase()}})
        setData(excelDataFormat)
        setDisplayDataModel(false)
        console.log("data setted")
        console.log(data)
    }
    const handleUseCsv=()=>{
        console.log(csvData)
      
        setData(csvData)
        setDisplayDataModel(false)
        console.log("data setted")
        console.log(data)
    }

    return(
        <>
        {displayDataModel&& 
            <div className='datamodel-outer'>
                <div className={`datamodel-container`}>
                    <div className='dataModelClose'><IoCloseSharp style={{height:"28px",width:"30px",cursor:"pointer"}} onClick={()=>{setDisplayDataModel(false)}} /> </div>
                    <h3 className='' style={{color:"brown"}}>Upload the Data through Excel Sheet</h3>
                    <input type="file" accept=".xlsx, .xls" onChange={handleExcelFile} />
                    {excelData.length>0 && <button className='excel-btn' onClick={handleUseExcel}>Use Excel Data</button>}
                    <h3 className=''  style={{color:"brown"}}>Upload a CSV file</h3>
                    <input type="file" onChange={handleCsvFile} />
                    {csvData.length>0 && <button className='excel-btn' onClick={()=>{handleUseCsv()}}>Use CSV Data</button>}
                    <h3 className=''  style={{color:"brown"}}>Get the data through API</h3>
                    <input type="text" placeholder="Enter the API" className='apiEnter' />
                </div>
            </div>
        }
        </>
    )
}

export default DataModel;