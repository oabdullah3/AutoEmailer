import { useLocation} from 'react-router-dom';
import './ConfirmationPage.css'; // Ensure to import your CSS file
import { useState } from 'react';

function ConfirmationPage() {

    const location = useLocation();
    const [subject, setSubject] = useState(location.state?.data.emailText.subject || {});
    const [emailContent, setEmailContent] = useState(location.state?.data.emailText.emailContent || {});
    const [emails, setEmails] = useState(location.state?.data.extractedEmails || []);
    const [newEmail, setNewEmail] = useState("");

    // Handle adding a new email
    const handleAddEmail = () => {
        if (newEmail.trim() && !emails.includes(newEmail)) {
        setEmails([...emails, newEmail.trim()]);
        setNewEmail("");
        }
    };

    // Handle removing an email
    const handleRemoveEmail = (index) => {
        setEmails(emails.filter((_, i) => i !== index));
    };

    // Handle editing an email
    const handleEditEmail = (index, updatedEmail) => {
        const updatedEmails = emails.map((email, i) => (i === index ? updatedEmail : email));
        setEmails(updatedEmails);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const userConfirmed = confirm("Are the email addresses and email content correct?");
        if (!userConfirmed) {
            e.preventDefault(); // Cancels the submit operation
            alert("Form submission canceled!"); // Optional: Notify the user
        }else{
            console.log("Updated Emails Array:", emails);
            console.log("Updated Subject:", subject);
            console.log("Updated Email Content:", emailContent);
        }
    };

    return (
        <div className="confirmation-container">
            <h1 className="confirmation-title">Confirmation Page</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label><h2 className="email-heading">Subject:</h2></label>
                    <textarea
                        className="email-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                    <label><h2 className="email-heading">Email Content:</h2></label>
                    <textarea
                        className="email-content"
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        required
                    />
                    <label><h2 className="email-heading">Recepient Email Addresses:</h2></label>
                    <ul className="emails">
                        {emails.map((email, index) => (
                            <li key={index} className="email">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => handleEditEmail(index, e.target.value)}
                                className="email-input"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveEmail(index)}
                                className="remove-button"
                            > 
                                Remove 
                            </button>
                            </li>
                        ))}
                        <li key="add" className="email">
                            <input
                                type="text"
                                placeholder="Add new email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="email-input"
                            />
                            <button
                                type="button"
                                onClick={handleAddEmail}
                                className="add-button"
                            >
                                Add
                            </button>
                        </li>
                    </ul>
                    <button type="submit">Submit Updated Details</button>
                </form>
            </div>
        </div>
    );
}

export default ConfirmationPage;