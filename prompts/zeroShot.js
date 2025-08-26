// prompts/zeroShot.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function zeroShotPrompt(userProfile) {
  const prompt = `
You are an AI Career Advisor.
Analyze the user's profile and provide:
- Suggested job roles
- Skill gaps
- Recommended learning resources
- Resume improvement tips

User Profile:
${userProfile}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
