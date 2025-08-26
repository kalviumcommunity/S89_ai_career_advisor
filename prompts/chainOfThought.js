// prompts/chainOfThought.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function chainOfThoughtPrompt(question) {
  const prompt = `
You are an AI assistant.
I will give you a reasoning problem.
Think through the problem step by step (do not skip steps), then provide the final answer.

Question: ${question}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
