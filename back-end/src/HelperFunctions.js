import axios from 'axios';
import * as cheerio from 'cheerio';
import { HfInference } from "@huggingface/inference";

export async function chatBot(messages) {

    const client = new HfInference("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");

    const chatCompletion = await client.chatCompletion({
        model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
        messages: [
            {
                role: "user",
                content: messages
            }
        ],
        provider: "hf-inference",
        max_tokens: 1000
    });

    return chatCompletion.choices[0].message;

}

export const scrapeWebsite = async (url) => {
    try {
        const response = await axios.get(url);
        
        // Log the response status and data length for debugging
        console.log(`Response Status: ${response.status}`);
        console.log(`Response Length: ${response.data.length} characters`);

        // Load the HTML into cheerio
        const $ = cheerio.load(response.data);
        return $('body').text().trim().replace(/\s+/g, ' '); // Return all text from the body
    } catch (error) {
        console.error('Error fetching the website:', error);
        throw error; // Rethrow the error for handling in the caller
    }
};

export const extractEmail = async (text) => {
    try {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emails = text.match(emailRegex);
        return emails ? emails : [];
    } catch (error){
        throw error; 
    }
}

export const generateEmail = async (details) => {

    const template = "Dear Hiring Manager,I hope this email finds you well. I am writing to express my interest in the ITC STEM Internship at Edutopia for the upcoming summer. With my passion for technology and my academic background in STEM, I believe I would be a valuable addition to your team. My name Mahad, and I am currently a First-year student majoring in Computer Science at City University Of Hong Kong. I have a solid foundation in various programming languages, including Python, JavaScript, and C++. I also have a strong foundation in web development including HTML, CSS and JavaScript.I have attached my resume, which provides further details regarding my qualifications, academic achievements, and relevant experiences. I would be grateful for the opportunity to discuss how I can contribute to the success of Edutopia during an interview.Thank you for considering my application for the ITC STEM Internship at Edutopia. I look forward to the possibility of contributing to your organization and gaining invaluable industry experience. Should you require any additional information or have any questions, please do not hesitate to contact me.Thank you for your time and consideration.Sincerely,MAHAD."
    
    const prompt = `Here is a sample email. use the details given to you about me and write me a similar email. dont give me placeholders for name etc. write it yourself. i will be sending this email directly. if you dont have anything then dont include it. the given mail is just a template. if you dont have job position/name/company name dont write it. following is the template ${template}. the following is users institution name ${details.institutionName}, the following is users name ${details.personName}, the following is users skills ${details.skills}`;

    const emailtosend = await chatBot(prompt);
    console.log(emailtosend);
    const cleanedText = emailtosend.content.replace(/<think>.*?<\/think>/s, '').trim();
    return cleanedText;
}