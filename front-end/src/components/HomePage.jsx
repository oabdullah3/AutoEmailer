import React from "react";
import {Link, useNavigate} from 'react-router-dom';

function HomePage(){
    const navigate = useNavigate();
    return (
        <div className = "container">
            <h1>Welcome to the Company Emailer</h1>
            <div className = 'buttonContainer'>
                <button onClick={() => navigate('/apply-url')}>Apply Through URL</button>
                <button onClick={() => navigate('/apply-excel')}>Apply Through Excel Files</button>
            </div>
        </div>
    );
}

export default HomePage;