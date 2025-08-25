import { countTokens } from "../utils/tokenizer.js";

export async function dynamicPrompt(genAI, userInput) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const context = "You are a travel guide chatbot.";
  const prompt = `${context}\nUser: ${userInput}`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  const tokensUsed = countTokens(prompt + response);
  console.log("Tokens Used (Dynamic):", tokensUsed);

  return { response, tokensUsed };
}
