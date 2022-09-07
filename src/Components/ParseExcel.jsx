import React, { useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';


export const ParseExcel =()=>{

    const [filename,setfilename]=useState(null);
    
    const exportData = (data) => {
        debugger;
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(data)
        
          )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
    
        link.click();
        window.location.reload();
      };
    const handleFile= async(e) =>{
debugger;
const file =e.target.files[0];
setfilename(file.name)
const data= await file.arrayBuffer();
const workbook=XLSX.read(data,{ type: 'binary' , cellDates: true });
const workSheet=workbook.Sheets[workbook.SheetNames[0]];
const jsonDate=XLSX.utils.sheet_to_json(workSheet);
console.log(jsonDate);
exportData(jsonDate)  ; 
};

return (
<div>
    <h1> ParseExcel</h1>
    {filename && (
        <p>
            FileName:<span>{filename}</span>
        </p> 
    )}
    <input type="file" onChange={(e)=> handleFile(e)} />
</div>

);
};