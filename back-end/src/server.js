import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import {generateEmail, extractEmail, chatBot, scrapeWebsite } from './HelperFunctions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const credentials = JSON.parse(
//     fs.readFileSync('./credentials.json')
// );

// admin.initializeApp({
//   credential: admin.credential.cert(credentials)
// });

const app = express();
app.use(express.json());
app.use(cors());



app.post('/api/url-data', async function(req,res){
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

    let emailText = await generateEmail(req.body.jobDetails);

    console.log("EMAIL TEXT", emailText);
    const returnData = {emailText : emailText, extractedEmails: extractedEmails};

    // // Store extracted emails in session
    // req.session.extractedEmails = ["mahadjawed4@gmail.com"]; // Store in session for email sending
    // req.session.jobDetails = requestData.jobDetails; // Save the session 
    res.status(200).json({ message: "Emails extracted and email text generated successfully", data: returnData});
});

const PORT = process.env.PORT || 8000;

async function start(){
    app.listen(PORT, function(){
        console.log("Server is listening on port " + PORT);
    });
}

start();

// let db;

// async function connectToDB(){
//     const uri = process.env.MONGODB_USERNAME
//     ? `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.um8hq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
//     :'mongodb://127.0.0.1:27017';
//     const client = new MongoClient(uri, {
//         serverApi:{
//             version:ServerApiVersion.v1,
//             strict:true,
//             deprecationErrors:true
//         }
//     });
//     await client.connect();
//     db = client.db('full-stack-react-db');
// }


// app.use(async function(req,res,next){
//     const {authtoken} = req.headers;
//     if (authtoken){
//         const user = await admin.auth().verifyIdToken(authtoken);
//         req.user = user;
//         next();
//     }
//     else{
//         res.sendStatus(400);
//     }
// });

// app.post('/api/articles/:name/upvote', async function(req,res){
//     const name = req.params.name;
//     const {uid} = req.user;

//     const article = await db.collection('articles').findOne({articleName:name});
//     const upvoteIds = article.upvoteIds || [];
//     const canUpvote = uid && !upvoteIds.includes(uid);

//     if(canUpvote){
//         const updatedArticle = await db.collection('articles').findOneAndUpdate(
//             {articleName:name},
//             {
//                 $inc:{upvotes:1},
//                 $push:{upvoteIds:uid}
//             },
//             {returnDocument:'after'}
//         );
//         res.status(200).json(updatedArticle);
//     }else{
//         res.sendStatus(403);
//     }
// });

// app.post('/api/articles/:name/comments',async function(req,res){
//     const name = req.params.name;
//     const {uid} = req.user;
//     if (uid){
//         const updatedArticle = await db.collection('articles').findOneAndUpdate(
//             {articleName:name},
//             {$push:{comments:req.body}},
//             {returnDocument:'after'}
//         );
//         res.json(updatedArticle);
//     } else {
//         res.sendStatus(403);
//     }
// });



// app.get('/hello', function(req,res) {
//     res.send('Hello from GET!');
// });

// app.get('/hello/:name', function(req,res) {
//     const {name} = req.params;
//     res.send('Hello from '+ name + ' GET!');
// });

// app.post('/hello', function(req,res) {
//     const {name} = req.body;
//     res.send('Hello from '+ name + ' POST!');
// });