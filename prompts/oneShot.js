import { countTokens } from "../utils/tokenizer.js";

export async function oneShotPrompt(genAI, userInput) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Translate this sentence to French:\n\n"${userInput}"`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  const tokensUsed = countTokens(prompt + response);
  console.log("Tokens Used (One-shot):", tokensUsed);

  return { response, tokensUsed };
}
