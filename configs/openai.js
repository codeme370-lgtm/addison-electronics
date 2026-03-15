import { OpenAI } from "openai"

if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not set. OpenAI requests will fail with 401/403.');
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});