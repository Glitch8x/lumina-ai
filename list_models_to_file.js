import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
const API_KEY = 'AIzaSyDi7XYrmi8JBmaRXBsHayNIfTmTgfMNzOY';

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        if (data.models) {
            const names = data.models.map(m => m.name).join('\n');
            fs.writeFileSync('available_models.txt', names);
            console.log("Models saved to available_models.txt");
        } else {
            console.log("No models found:", JSON.stringify(data));
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
listModels();
