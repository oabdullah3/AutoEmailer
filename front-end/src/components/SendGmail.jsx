import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationPage from "./ConfirmationPage";

function SendGmail(){

    const location = useLocation();
    const accessToken = location.state?.data.token;
    const emails = location.state?.data.emailDetails.extractedEmails;
    const subject = location.state?.data.emailDetails.emailText.subject;
    const emailContent = location.state?.data.emailDetails.emailText.emailContent;
    const navigate = useNavigate();

    const sendEmail = async (updatedEmails, updatedEmailContent, updatedSubject) => {
        if (!accessToken) {
        alert("Please log in with Google first!");
        return;
        }
        
        const recipientsString = updatedEmails.join(", ");

        const emailLines = [
            `To: ${recipientsString}`,
            `Subject: ${updatedSubject}`,
            "MIME-Version: 1.0",
            "Content-Type: text/plain; charset=UTF-8",
            "", // Empty line separates headers from body
            updatedEmailContent
          ];
          
        const email = emailLines.join('\r\n');
        // Encode the email in RFC 2822 format (base64)
        
        try {
            // Encode with proper UTF-8 handling
            const encoder = new TextEncoder();
            const data = encoder.encode(email);
            const binaryString = Array.from(data, byte => String.fromCharCode(byte)).join('');
            const encodedEmail = btoa(binaryString)
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        
            await axios.post(
                "https://www.googleapis.com/gmail/v1/users/me/messages/send",
                { raw: encodedEmail },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            alert("Email sent successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error details:", error.response?.data); // Check specific error
            alert("Failed to send email.");
        }
    };

    return (
        <div>
            <ConfirmationPage addresses={emails} content={emailContent} sub={subject} sendEmail={sendEmail}/>
        </div>
    );
}

export default SendGmail;