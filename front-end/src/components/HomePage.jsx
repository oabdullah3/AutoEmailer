import React from "react";
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1>Welcome to the Company Emailer</h1>
            <p>
                This tool helps you automate emails to hiring managers. You can choose to apply through a URL or an Excel file. 
                Please ensure that the URL or Excel contains the job details, especially the email addresses of the companies.
            </p>
            <p>
                Here's how it works:
            </p>
            <ol>
                <li>Choose an option: Apply Through URL or Apply Through Excel Files.</li>
                <li>We will extract all the email addresses automatically.</li>
                <li>On the next page, enter your personal particulars.</li>
                <li>We'll generate a customized email for you using AI and the extracted emails.</li>
                <li>Once you confirm, we will send the email to all the addresses.</li>
            </ol>
            <div className='buttonContainer'>
                <button onClick={() => navigate('/apply-url')}>Apply Through URL</button>
                <button onClick={() => navigate('/apply-excel')}>Apply Through Excel Files</button>
            </div>
        </div>
    );
}

export default HomePage;