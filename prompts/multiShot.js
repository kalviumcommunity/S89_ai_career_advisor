import { countTokens } from "../utils/tokenizer.js";

export async function multiShotPrompt(genAI, userInput) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const examples = `
User: What is 2 + 2?
AI: 4
User: What is the capital of France?
AI: Paris
  `;

  const prompt = `${examples}\nUser: ${userInput}\nAI:`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  const tokensUsed = countTokens(prompt + response);
  console.log("Tokens Used (Multi-shot):", tokensUsed);

  return { response, tokensUsed };
}
