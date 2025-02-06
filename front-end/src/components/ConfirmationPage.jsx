import { useLocation } from 'react-router-dom';

function ConfirmationPage(){
    const location = useLocation();
    return (
        <div>
            <h1>Confirmation Page</h1>
            <p>{location.state?.data.emailText.subject}</p>
            <p>{location.state?.data.emailText.emailContent}</p>
            <ul>{location.state?.data.extractedEmails.map((email) =>{
                return <li key={email}>{email}</li>;
            })}
            </ul>
            {
            /* <div style={styles.emailDetails}>
                <h3>To: {emailDetails.to}</h3>
                <pre>{emailDetails.content}</pre>
            </div>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleSend}>Send Email</button>
                <button style={styles.button} onClick={onCancel}>Cancel</button>
            </div> */}
        </div>
    );
}

export default ConfirmationPage;