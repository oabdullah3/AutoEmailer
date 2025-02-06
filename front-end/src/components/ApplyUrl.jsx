import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function ApplyUrl(){
    const [url, setUrl] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [personName, setPersonName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [skills, setSkills] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            const jobDetails = {
                purpose: purpose,
                institutionName: institutionName,
                personName: personName,
                skills: skills,
            };
            setIsLoading(true);
            const res = await axios.post('http://localhost:8000/api/url-data', { url, jobDetails });
            setData(res.data.data);
        } catch (error) {
            console.error(error);
            setData(null);
        } 
        // finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <div>
            <h1>Job Application Helper</h1>
            {isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Give URL containing job details"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
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
                    <button type="submit">Apply</button>
                </form>
            )}
        </div>
    );
}
export default ApplyUrl;