// server.js - Zero Shot Prompting Example
// import express from "express";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { oneShotPrompt } from "./prompts/oneShot.js";
// import { multiShotPrompt } from "./prompts/multiShot.js";
// import { dynamicPrompt } from "./prompts/dynamicPrompt.js";
// import { countTokens } from "./utils/tokenizer.js";

// dotenv.config();
// const app = express();
// app.use(express.json());

// // Gemini setup
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ----------- ROUTES -------------

// // 🟢 System Prompting
// app.post("/system", async (req, res) => {
//   try {
//     const { userInput } = req.body;
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const systemPrompt = `You are a helpful AI assistant for students learning AI.`;
//     const prompt = `${systemPrompt}\nUser: ${userInput}`;

//     const result = await model.generateContent(prompt);
//     const response = result.response.text();

//     // count tokens
//     const tokensUsed = countTokens(prompt + response);
//     console.log("Tokens Used:", tokensUsed);

//     res.json({ response, tokensUsed });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🟢 One-shot Prompting
// app.post("/one-shot", async (req, res) => {
//   res.json(await oneShotPrompt(genAI, req.body.userInput));
// });

// // 🟢 Multi-shot Prompting
// app.post("/multi-shot", async (req, res) => {
//   res.json(await multiShotPrompt(genAI, req.body.userInput));
// });

// // 🟢 Dynamic Prompting
// app.post("/dynamic", async (req, res) => {
//   res.json(await dynamicPrompt(genAI, req.body.userInput));
// });

// // --------------------------------

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));






// server.js
// server.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { zeroShotPrompt } from "./prompts/zeroShot.js";
import { oneShotPrompt } from "./prompts/oneShot.js";
import { multiShotPrompt } from "./prompts/multiShot.js";
import { dynamicPrompt } from "./prompts/dynamicPrompt.js";
import { chainOfThoughtPrompt } from "./prompts/chainOfThought.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// 🟢 Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------- PROMPT ROUTES ----------------
app.post("/api/prompt", async (req, res) => {
  try {
    const { type, input } = req.body;
    let response;

    switch (type) {
      case "zero-shot":
        response = await zeroShotPrompt(input);
        break;
      case "one-shot":
        response = await oneShotPrompt(input);
        break;
      case "multi-shot":
        response = await multiShotPrompt(input);
        break;
      case "dynamic":
        response = await dynamicPrompt(input);
        break;
      case "chain-of-thought":
        response = await chainOfThoughtPrompt(input);
        break;
      default:
        return res.status(400).json({ error: "Invalid prompt type" });
    }

    res.json({ response });
  } catch (error) {
    console.error("❌ Error in /api/prompt:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------------- TEMPERATURE ROUTE ----------------
app.post("/api/temperature", async (req, res) => {
  try {
    const { query, temperature } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: query }] }],
      generationConfig: { temperature: temperature || 0.7 },
    });

    res.json({
      query,
      response: result.response.text(),
      usedTemperature: temperature || 0.7,
    });
  } catch (error) {
    console.error("❌ Error in /api/temperature:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------------- TOP-P ROUTE ----------------
app.post("/api/topp", async (req, res) => {
  try {
    const { query, topP } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: query }] }],
      generationConfig: { topP: topP || 0.8 },
    });

    res.json({
      query,
      response: result.response.text(),
      usedTopP: topP || 0.8,
    });
  } catch (error) {
    console.error("❌ Error in /api/topp:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});






// import express from "express";
// import fetch from "node-fetch";
// import bodyParser from "body-parser";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "your_api_key_here";

// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const response = await fetch("https://api.perplexity.ai/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "llama-3.1-8b-instruct", // free-tier friendly model
//         messages: [
//           { role: "system", content: "You are a helpful AI assistant." },
//           { role: "user", content: message },
//         ],
//       }),
//     });

//     const data = await response.json();
//     res.json({ reply: data?.choices?.[0]?.message?.content || "No reply" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ reply: "Error communicating with Perplexity API" });
//   }
// });

// app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
