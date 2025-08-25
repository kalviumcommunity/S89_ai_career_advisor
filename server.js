// server.js - Zero Shot Prompting Example
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

/**
 * ZERO-SHOT PROMPTING
 * (Only instructions, no examples)
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

        res.json({ prompt_used: zeroShotPrompt, plan: aiResponse });
    } catch (error) {
        res.status(500).json({ plan: '', error: error.message });
    }
});

/**
 * ONE-SHOT PROMPTING
 * (Instruction + 1 example)
 */
app.post('/career-advice-one-shot', async (req, res) => {
    try {
        const { skills, interests, goals } = req.body;

        const oneShotPrompt = `
        You are an AI Career Advisor.
        Example:
        User Profile:
        Skills: HTML, CSS
        Interests: Web design
        Goals: Build creative websites
        Output:
        Suggested Roles: Frontend Developer, UI Designer
        Skill Gaps: JavaScript, React
        Learning Resources: "JavaScript for Beginners - Udemy", "React Docs"
        Resume Tips: Highlight design projects, Show creativity in portfolio

        Now analyze this new user:

        Skills: ${skills}
        Interests: ${interests}
        Goals: ${goals}
        `;

        const aiResponse = {
            suggested_roles: ['Full Stack Developer', 'Backend Engineer'],
            skill_gaps: ['Node.js', 'Database Management'],
            learning_resources: [
                'Node.js Complete Guide - Udemy',
                'MongoDB University Free Courses'
            ],
            resume_tips: [
                'Include backend projects',
                'Showcase problem-solving in code',
                'Mention teamwork in projects'
            ]
        };

        res.json({ prompt_used: oneShotPrompt, plan: aiResponse });
    } catch (error) {
        res.status(500).json({ plan: '', error: error.message });
    }
});

/**
 * FEW-SHOT (MULTI-SHOT) PROMPTING
 * (Instruction + multiple examples)
 */
app.post('/career-advice-few-shot', async (req, res) => {
    try {
        const { skills, interests, goals } = req.body;

        const fewShotPrompt = `
        You are an AI Career Advisor.

        Example 1:
        User Profile:
        Skills: Python, Data Cleaning
        Interests: Analytics
        Goals: Work in data-driven role
        Output:
        Suggested Roles: Data Analyst, Business Intelligence Engineer
        Skill Gaps: SQL, Power BI
        Learning Resources: "SQL for Data Analysis - Coursera", "Power BI Basics - Microsoft"
        Resume Tips: Emphasize data projects, Add measurable results

        Example 2:
        User Profile:
        Skills: Java, Problem Solving
        Interests: Mobile Apps
        Goals: Become an Android Developer
        Output:
        Suggested Roles: Android Developer, Mobile Software Engineer
        Skill Gaps: Kotlin, Android SDK
        Learning Resources: "Kotlin Bootcamp - Google", "Android Development for Beginners"
        Resume Tips: Highlight app projects, Add GitHub links

        Now analyze this new user:

        Skills: ${skills}
        Interests: ${interests}
        Goals: ${goals}
        `;

        const aiResponse = {
            suggested_roles: ['Cloud Engineer', 'DevOps Engineer'],
            skill_gaps: ['Docker', 'Kubernetes', 'AWS'],
            learning_resources: [
                'AWS Certified Cloud Practitioner - Amazon',
                'Docker & Kubernetes - Udemy'
            ],
            resume_tips: [
                'Show cloud projects',
                'Add certifications',
                'Highlight automation skills'
            ]
        };

        res.json({ prompt_used: fewShotPrompt, plan: aiResponse });
    } catch (error) {
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
