import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateAffirmations() {
    try {
        const prompt = `Generate two positive affirmations for a user.`
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        affirmation1: { type: Type.STRING },
                        affirmation2: { type: Type.STRING },
                    },
                    propertyOrdering: ["affirmation1", "affirmation2"],
                }
            }
        });
        console.log("Generated safety tips:", response.text);
        const parsed = JSON.parse(response.text);
        return parsed;
    } catch (error) {
        console.error("Error generating safety tips:", error);
        throw new Error("Failed to generate safety tips");
    }
}

export default generateAffirmations;