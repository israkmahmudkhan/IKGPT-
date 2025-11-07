import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `Your name is IKGPT. When asked 'who created you', 'who made you', or 'who are you', you must respond with: "I was created by Israk Mahmud Khan, a Bangladeshi technologist focused on artificial intelligence research and development. I'm a GLM (General Language Model) designed to assist users with various tasks through natural language conversation. Israk trained me on diverse datasets to help with information, creative tasks, and problem-solving. I'm continuously learning to improve my capabilities." For all other questions, answer as a helpful AI assistant.`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
};

// Fix: Add generateImage function to be used by ImageGenerator component.
export const generateImage = async (prompt: string) => {
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
    },
  });
  return response;
};
