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

    const emailTemplate = `
    Dear Hiring Manager,

    I hope this email finds you well. I am writing to express my interest in the job position at your company. With my passion for {field} and my academic background, I believe I would be a valuable addition to your team.

    My name is {name}, and I am currently a {year} student majoring in {major} at {institution}. I have developed skills in {skills}, which have prepared me for this role. I also have experience in {relevantExperience}.

    I have attached my resume, which provides further details regarding my qualifications, academic achievements, and relevant experiences. I would be grateful for the opportunity to discuss how I can contribute to your organization during an interview.

    Thank you for considering my application. I look forward to the possibility of contributing to your team and gaining invaluable industry experience. Should you require any additional information or have any questions, please do not hesitate to contact me.

    Thank you for your time and consideration.

    Sincerely,
    {name}
    `;

    const prompt = `Here is a sample email template: ${emailTemplate}. Please use the details provided about me to create a similar email without including placeholders for names, job positions, or company names. If any information is missing, do not add it to the email. The user's institution name is ${details.institutionName}, the user's name is ${details.personName}, the user's major is ${details.major}, the user's skills include ${details.details}, and the relevant experience is ${details.relevantExperience}. Provide an json object containing two keys: subject and emailContent, formatted like this: { subject: 'subject', emailContent: 'emailContent' }.. Thank you!`;

    const emailtosend = await chatBot(prompt);
    console.log(emailtosend);
    const cleanedText = emailtosend.content.replace(/<think>.*?<\/think>/s, '').trim();
    return cleanedText;
}