import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import xlsx from 'xlsx';
import fs from 'fs';
import {generateEmail, extractEmail, chatBot, scrapeWebsite } from './HelperFunctions.js';
import multer from 'multer';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


const app = express();
app.use(express.json());
app.use(cors());

// Set up session middleware
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));


app.post('/api/url-data', async function(req,res){
    try{
        console.log("URL", req.body.url);
        const scrappedData = await scrapeWebsite(req.body.url);    
        const prompt = "Here is some scraped website data. Please extract the contact email address and return it in an array format. If no email address is found, return an empty array. I don't want to know what you are thinking, just give me the email in an array and no other words. Example output: [mahadjawed4@gmail.com] Thank you!\n\n " + scrappedData;
        const chatData = await chatBot(prompt);
        console.log("CHAT DATA", chatData);
        //const extractedEmail = extractEmail(chatData.content || ''); // Fallback to empty string if content is undefined
        let extractedEmails = await extractEmail(chatData.content || ''); // Fallback to empty string if content is undefined
        //Emails to remove
        const emailsToRemove = ['name@domain.com', 'mahadjawed4@gmail.com'];
        //Remove duplicates
        extractedEmails = [...new Set(extractedEmails)];
        // Remove specified emails directly from the extractedEmail array
        extractedEmails = extractedEmails.filter(email => !emailsToRemove.includes(email));
        console.log("EXTRACTED EMAIL", extractedEmails);
        req.session.extractedEmails = extractedEmails; // Store in session for email sending

        let emailText = await generateEmail(req.body.jobDetails);
        emailText = JSON.parse(emailText);

        console.log("EMAIL TEXT", emailText);
        req.session.email = emailText.emailContent; // Store in session for email sending
        const returnData = {emailText : emailText, extractedEmails: extractedEmails};

        res.status(200).json({ message: "Emails extracted and email text generated successfully", data: returnData});


    } catch (error){
        res.status(500).send('Error reading the uploaded file.');
    }
});


app.post('/api/excel-data', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(uploadsDir, req.file.filename);
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Parse the jobDetails from the request body
        const jobDetails = JSON.parse(req.body.json);

        const prompt = "Here is some scraped website data. Please extract the contact email address and return it in an array format. If no email address is found, return an empty array. I don't want to know what you are thinking, just give me the email in an array and no other words. Example output: [mahadjawed4@gmail.com] Thank you!\n\n " + JSON.stringify(data);
        const chatData = await chatBot(prompt); // Call your chatCompletion function
        
        console.log("CHAT DATA", chatData);
        let extractedEmails = await extractEmail(chatData.content || '');
        const emailsToRemove = ['name@domain.com', 'mahadjawed4@gmail.com'];
        extractedEmails = [...new Set(extractedEmails)];
        extractedEmails = extractedEmails.filter(email => !emailsToRemove.includes(email));
        console.log("EXTRACTED EMAIL", extractedEmails);
        req.session.extractedEmails = extractedEmails;

        console.log(jobDetails);

        // Pass the parsed jobDetails to generateEmail
        let emailText = await generateEmail(jobDetails);
        emailText = JSON.parse(emailText);
        console.log("EMAIL TEXT", emailText);
        req.session.email = emailText.emailContent;
        const returnData = { emailText: emailText, extractedEmails: extractedEmails };

        res.status(200).json({ message: "Emails extracted and email text generated successfully", data: returnData });
        
    } catch (error) {
        res.status(500).send('Error uploading file or generating email');
    }
});


const PORT = process.env.PORT || 8000;
async function start(){
    app.listen(PORT, function(){
        console.log("Server is listening on port " + PORT);
    });
}

start();

// import multer from 'multer';
// const upload = multer(); // Use memory storage for simplicity
// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

// app.post('/api/excel-data', upload.single('file'),async function(req,res){

//     console.log("Uploaded File:", req.file);
//     const jobDetails = JSON.parse(req.body.json);
//     console.log("JSON Data:", jobDetails);
//     // const jobDetails = req.body.json.jobDetails;

//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     const filePath = path.join(uploadsDir, req.file.filename);
//     try {
//         const workbook = xlsx.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const data = xlsx.utils.sheet_to_json(worksheet);

//         const prompt = "Here is some scraped website data. Please extract the contact email address and return it in an array format. If no email address is found, return an empty array. I don't want to know what you are thinking, just give me the email in an array and no other words. Example output: [mahadjawed4@gmail.com] Thank you!\n\n sohahashmi68@gmail.com" + JSON.stringify(data);
//         const chatData = await chatBot(prompt);
        
//         let extractedEmails = await extractEmail(chatData.content || '');
//         const emailsToRemove = ['name@domain.com', 'mahadjawed4@gmail.com'];
//         extractedEmails = [...new Set(extractedEmails)];
//         extractedEmails = extractedEmails.filter(email => !emailsToRemove.includes(email));
//         console.log("EXTRACTED EMAIL", extractedEmails);

//         const emailText = await generateEmail(jobDetails);
//         console.log("EMAIL TEXT", emailText);
//         const returnData = {emailText : emailText, extractedEmails: extractedEmails};

//         res.status(200).json({ message: "Emails extracted and email text generated successfully", data: returnData});

//     } catch (error) {
//         console.error('Error reading Excel file:', error);
//         res.status(500).send('Error reading the uploaded file.');
//     }    
// });

