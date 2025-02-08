import {useGoogleLogin } from "@react-oauth/google";

import { useLocation, useNavigate } from "react-router-dom";

function EmailLogin(){
    const location = useLocation();
    const navigate = useNavigate();

    const loginGoogle = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            alert("Google Login Successful!");
            const token = tokenResponse.access_token;
            const emailDetails = location.state?.data;
            const returnData = {token, emailDetails};
            navigate('/send-gmail', {
                state: {
                    data: returnData
                }
            });
        },
        onError: () => {
            alert("Google Login Failed!");
        },
        scope: "https://www.googleapis.com/auth/gmail.send", // Gmail API scope
    });


    return (
        <div>
            <h1>Login with the Sender Email</h1>
            <button
                    onClick={() => loginGoogle()}
                    >
                    Log in with Google
            </button>
        </div>
    );
}

export default EmailLogin;