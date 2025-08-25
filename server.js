// server.js - Zero Shot Prompting Example
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

/**
 * ------------------------------
 * ZERO-SHOT PROMPTING
 * ------------------------------
 */
app.post('/career-advice-zero-shot', async (req, res) => {
    try {
        const { skills, interests, goals } = req.body;

        const zeroShotPrompt = `
        You are an AI Career Advisor.
        Analyze the user's profile and provide:
        - Suggested job roles
        - Skill gaps
        - Recommended learning resources
        - Resume improvement tips

        User Profile:
        Skills: ${skills}
        Interests: ${interests}
        Goals: ${goals}
        `;

        // Mock AI response
        const aiResponse = {
            suggested_roles: ['Machine Learning Engineer', 'Data Analyst'],
            skill_gaps: ['Statistics', 'TensorFlow'],
            learning_resources: [
                'Introduction to Statistical Learning - Coursera',
                'TensorFlow Developer Certificate - Udemy'
            ],
            resume_tips: [
                'Add projects that show ML applications',
                'Emphasize analytical problem-solving',
                'Include measurable results from past work'
            ]
        };

        res.json({ prompting_type: "zero-shot", prompt_used: zeroShotPrompt, plan: aiResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ plan: '', error: error.message });
    }
});

/**
 * ------------------------------
 * ONE-SHOT PROMPTING
 * ------------------------------
 */
app.post('/career-advice-one-shot', async (req, res) => {
    try {
        const { skills, interests, goals } = req.body;

        // One-shot prompting: instruction + one example
        const oneShotPrompt = `
        You are an AI Career Advisor.
        Provide personalized advice in the following structure:
        - Suggested job roles
        - Skill gaps
        - Recommended learning resources
        - Resume improvement tips

        Example:
        User Profile:
        Skills: Python, SQL
        Interests: Data Analysis
        Goals: Become a Data Scientist

        AI Response:
        Suggested Roles: Data Scientist, Business Intelligence Analyst
        Skill Gaps: Machine Learning, Deep Learning
        Learning Resources: "Hands-On Machine Learning with Scikit-Learn", Coursera ML Course
        Resume Tips: Add data-driven projects, emphasize SQL queries and business insights.

        ----------------------------
        Now analyze this new profile:
        Skills: ${skills}
        Interests: ${interests}
        Goals: ${goals}
        `;

        // Mock AI response
        const aiResponse = {
            suggested_roles: ['AI Researcher', 'NLP Engineer'],
            skill_gaps: ['Deep Learning', 'Transformers'],
            learning_resources: [
                'Deep Learning Specialization - Coursera',
                'Natural Language Processing with Transformers - HuggingFace'
            ],
            resume_tips: [
                'Showcase NLP projects',
                'Highlight Python and ML framework experience',
                'Add research/publications if any'
            ]
        };

        res.json({ prompting_type: "one-shot", prompt_used: oneShotPrompt, plan: aiResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ plan: '', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
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
