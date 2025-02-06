import React, { useState } from 'react';
import axios from 'axios';

function ApplyExcel(){
    const [url, setUrl] = useState('');
    const [jobDetails, setJobDetails] = useState('');
    const [response, setResponse] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        // if (!file) {
        //     alert('No file selected!');
        //     return;
        // }

        // const formData = new FormData();
        // formData.append('file', file);

        // try {
        //     const res = await axios.post('http://localhost:8080/upload', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     setUploadResponse(res.data);
        // } catch (error) {
        //     console.error(error);
        //     setUploadResponse({ success: false, error: error.message });
        // }
    };
    return (
        <div>
       
            <h1>Upload Excel File</h1>
            <form onSubmit={handleFileUpload}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls"
                    required
                />
                <button type="submit">Upload</button>
            </form>
            {uploadResponse && (
                <div>
                    <h2>Upload Results:</h2>
                    <pre>{JSON.stringify(uploadResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ApplyExcel;