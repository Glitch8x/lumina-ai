import { GoogleGenerativeAI } from '@google/generative-ai';

// API Key provided by user previously
const API_KEY = 'AIzaSyDi7XYrmi8JBmaRXBsHayNIfTmTgfMNzOY';

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        const models = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }).apiKey; // Hack: accessing the client through the model isn't the list way.
        // The correct way in the SDK:
        // actually, the SDK might strictly require a model to be instantiated.
        // Let's use the REST API approach for listing models, simpler than guessing SDK internal methods for listing if not obvious.
        // Wait, typical SDK usage:
        // There isn't a direct "listModels" on the main class in some versions. 
        // Let's look at the error message from Step 154: "Call ListModels to see the list..."

        // I will try to use the REST API via fetch, it is cleaner.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        console.log("Available Models:", JSON.stringify(data, null, 2));

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
