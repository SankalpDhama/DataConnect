import "./FileUpload.css"
import axios from "axios";
import React, { useEffect, useState } from "react";
const FileUpload=async ({contract,account,provider})=>{
    const [file,setFile]=useState(null);
    const [FileName,setFileName]=useState(null);
    const handleSubmit =async (event)=>{
        event.preventDefault();
    }
    if(file){
        try{
            const formData=new FormData();
            formData.append("file",file);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                  pinata_api_key: ``,
                  pinata_secret_api_key: ``,
                  "Content-Type": "multipart/form-data",
                },
              });
              const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
              contract.add(account,ImgHash)
              alert("Successfully Image Upload");
              setFileName("no image selected");
              setFile(null);
        }catch(error){
            alert(error);
        }
    }
    const retriveFile=(event)=>{
        const data=event.target.files[0];
        const readder=new window.FileReader();
        readder.readAsArrayBuffer(data);
        readder.onloadend=()=>{
            setFile(event.target.files[0])
        }
        console.log(event.target.files[0].name)
        setFileName(event.target.files[0].name);
        event.preventDefault();
    }
    return(
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlfor="file-upload" className="choose">Choose Image</label>
                <input type="file" id="file-upload" name="data" onChange={retriveFile} disabled={!account}/>
                <span className="textArea">Image:{FileName}</span>
                <button type="submit" className="upload" disabled={!file}>Upload File</button>
            </form>
        </div>
    );
};
export default FileUpload;