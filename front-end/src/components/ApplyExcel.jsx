import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function ApplyExcel(){
    const [institutionName, setInstitutionName] = useState('');
    const [personName, setPersonName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [skills, setSkills] = useState('');
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            navigate('/confirmation', {
            state: {
                data: data // Use the updated `data` state
            }
            });
        }
    }, [data, navigate]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            alert('No file selected!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const jobDetails = {
                purpose: purpose,
                institutionName: institutionName,
                personName: personName,
                skills: skills,
            };
            formData.append('json',JSON.stringify(jobDetails));
            setIsLoading(true);
            const res = await axios.post('http://localhost:8000/api/excel-data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setData(res.data);
        } catch (error) {
            console.error(error);
            setData(null);
        }
    };

    return (
        <div>
            <h1>Excel Email Extraction</h1>
            {isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            {(!isLoading && 
                <form onSubmit={handleFileUpload}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".xlsx, .xls"
                        required
                    />
                    <h2>Your Personal Details (Used for generating emails)</h2>
                    <input
                        type="text"
                        placeholder="Email Purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Institution Name"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Person's Name"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Skills (comma-separated)"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        required
                    />
                    <button type="submit">Upload</button>
                </form>
            )}
            {/* {uploadResponse && (
                <div>
                    <h2>Upload Results:</h2>
                    <pre>{JSON.stringify(uploadResponse, null, 2)}</pre>
                </div>
            )} */}
        </div>
    );
}

export default ApplyExcel;