import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';


function ApplyUrl(){
    const [url, setUrl] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [personName, setPersonName] = useState('');
    const [Major, setMajor] = useState('');
    const [relevantExperience, setrelevantExperience] = useState('');
    const [purpose, setPurpose] = useState('');
    const [details, setDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
          navigate('/email-login', {
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
                details: details,
                major:Major,
                relevantExperience:relevantExperience
            };
            setIsLoading(true);
            const res = await axios.post('http://localhost:8000/api/url-data', { url, jobDetails });
            setData(res.data.data);
        } catch (error) {
            console.error(error);
            alert("Server error, try again");
            setData(null);
            setIsLoading(false);
        } 
        // finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <div>
            <h1>URL Email Extraction</h1>
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
                        placeholder="Your Name"
                        value={personName}
                        onChange={(e) => setPersonName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Email Purpose such as Job Application/Internship Application"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                    />
                   
                    <input
                        type="text"
                        placeholder="Your Current Institution Name"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Your Major"
                        value={Major}
                        onChange={(e) => setMajor(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Relevant Experience"
                        value={relevantExperience}
                        onChange={(e) => setrelevantExperience(e.target.value)}
                        required
                    />
                 
                    <textarea
                        placeholder="Give a brief description of your skills and experience. also give details about you like your major interests etc."
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    />
                    <button type="submit">Apply</button>
                </form>
            )}
        </div>
    );
}
export default ApplyUrl;