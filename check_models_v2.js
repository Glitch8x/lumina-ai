import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = 'AIzaSyDi7XYrmi8JBmaRXBsHayNIfTmTgfMNzOY';

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        if (data.models) {
            data.models.forEach(m => console.log(m.name));
        } else {
            console.log("No models found or error structure:", data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
listModels();
