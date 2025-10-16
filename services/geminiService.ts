
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeProjectDescription = async (description: string): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("AI analysis is disabled because the API key is not configured.");
    }
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
            You are a world-class real estate analyst specializing in the Dubai market.
            Analyze the following project description and provide a concise, insightful analysis for a potential investor.
            Format your response in clear sections using markdown.

            The analysis should include:
            1.  **Executive Summary:** A brief, powerful summary of the project's key selling points.
            2.  **Investment Potential:** Comment on the potential for appreciation and rental yield based on the description. Mention key factors like location, developer reputation, and amenities.
            3.  **Target Audience:** Who is the ideal buyer or tenant for this property (e.g., families, young professionals, luxury seekers)?
            4.  **Key Questions to Ask:** What are 2-3 critical questions an investor should ask the sales agent before purchasing?

            **Project Description:**
            ---
            ${description}
            ---
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing project with Gemini:", error);
        throw new Error("Failed to get analysis from AI service.");
    }
};
