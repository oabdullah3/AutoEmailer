import { useLocation } from 'react-router-dom';
import './ConfirmationPage.css'; // Ensure to import your CSS file

function ConfirmationPage() {

    const handleonclick = (e) => {
        e.preventDefault();
        console.log('Redirecting to Google Auth...');
        console.log('Redirecting to Google Auth...');
        window.location.href = 'http://localhost:8000/auth/google/callback';
    };


    const location = useLocation();
    const { subject, emailContent } = location.state?.data.emailText || {};
    const extractedEmails = location.state?.data.extractedEmails || [];

    return (
        <div className="confirmation-container">
            <h1 className="confirmation-title">Confirmation Page</h1>
            <div className="email-details">
                <h2 className="email-heading">Subject:</h2>
                <p className="email-subject">{subject || "No Subject"}</p>
                <h2 className="email-heading">Email Content:</h2>
                <p className="email-content">{emailContent || "No Content Available"}</p>
            </div>
            {extractedEmails.length > 0 && (
                <div className="email-list">
                    <h3>Extracted Emails:</h3>
                    <ul>
                        {extractedEmails.map((email) => (
                            <li key={email}>{email}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={handleonclick}>submit</button>
        </div>
    );
}

export default ConfirmationPage;