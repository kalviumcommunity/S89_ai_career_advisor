// server.js - Zero Shot Prompting Example
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

/**
 * ---------------------------
 * ZERO-SHOT PROMPTING
 * ---------------------------
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

        res.json({ prompt_type: "Zero-Shot", prompt_used: zeroShotPrompt, plan: aiResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * ---------------------------
 * ONE-SHOT PROMPTING
 * ---------------------------
 */
app.post('/career-advice-one-shot', async (req, res) => {
    try {
        const { skills, interests, goals } = req.body;

        const oneShotPrompt = `
        You are an AI Career Advisor.
        Example:
        User Profile:
        Skills: Python, SQL
        Interests: Data
        Goals: Become a Data Scientist

        AI Response:
        - Suggested Roles: Data Scientist, Data Analyst
        - Skill Gaps: Machine Learning, Deep Learning
        - Resources: Coursera ML, FastAI Deep Learning
        - Resume Tips: Highlight data-driven projects

        Now analyze this new profile:
        Skills: ${skills}
        Interests: ${interests}
        Goals: ${goals}
        `;

        const aiResponse = {
            suggested_roles: ['Full Stack Developer', 'Backend Engineer'],
            skill_gaps: ['System Design', 'Microservices'],
            learning_resources: [
                'System Design Primer - GitHub',
                'Microservices with Node.js - Udemy'
            ],
            resume_tips: [
                'Show end-to-end projects',
                'Highlight teamwork and scalability',
                'Quantify backend performance improvements'
            ]
        };

        res.json({ prompt_type: "One-Shot", prompt_used: oneShotPrompt, plan: aiResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * ---------------------------
 * MULTI-SHOT PROMPTING
 * ---------------------------
 */
app.post('/career-advice-multi-shot', async (req, res) => {
    try {
        const { skills, interests, goals } = req.body;

        const multiShotPrompt = `
        You are an AI Career Advisor.
        Learn from these examples:

        Example 1:
        User Profile:
        Skills: Java, Spring Boot
        Interests: Web Development
        Goals: Become a Backend Engineer

        AI Response:
        - Suggested Roles: Backend Engineer, Java Developer
        - Skill Gaps: Cloud Computing, Docker
        - Resources: Spring Boot Microservices, AWS Essentials
        - Resume Tips: Mention scalable systems and APIs

        Example 2:
        User Profile:
        Skills: HTML, CSS, JavaScript
        Interests: Frontend Development
        Goals: Become a UI/UX Engineer

        AI Response:
        - Suggested Roles: Frontend Developer, UI/UX Engineer
        - Skill Gaps: React, Figma
        - Resources: React Crash Course, Figma for Beginners
        - Resume Tips: Show design + coding skills

        Now analyze this new profile:
        Skills: ${skills}
        Interests: ${interests}
        Goals: ${goals}
        `;

        const aiResponse = {
            suggested_roles: ['Cloud Engineer', 'DevOps Engineer'],
            skill_gaps: ['Kubernetes', 'CI/CD'],
            learning_resources: [
                'Kubernetes for Beginners - Udemy',
                'CI/CD with Jenkins - Coursera'
            ],
            resume_tips: [
                'Highlight automation skills',
                'Add DevOps pipeline contributions',
                'Show experience with containers'
            ]
        };

        res.json({ prompt_type: "Multi-Shot", prompt_used: multiShotPrompt, plan: aiResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * ---------------------------
 * DYNAMIC PROMPTING
 * ---------------------------
 */
app.post('/career-advice-dynamic', async (req, res) => {
    try {
        const { skills, interests, goals, experienceLevel } = req.body;

        const dynamicPrompt = `
        You are an AI Career Advisor.
        Tailor the advice based on user’s **experience level**.
        
        User Profile:
        Skills: ${skills}
        Interests: ${interests}
        Goals: ${goals}
        Experience Level: ${experienceLevel}

        Provide:
        - Job Roles
        - Skill Gaps
        - Learning Resources
        - Resume Tips (adapted to experience level)
        `;

        let aiResponse = {};

        if (experienceLevel === "Beginner") {
            aiResponse = {
                suggested_roles: ['Junior Web Developer', 'Intern - Data Analyst'],
                skill_gaps: ['Basic Algorithms', 'Databases'],
                learning_resources: ['CS50 Introduction to Computer Science', 'SQL for Beginners - YouTube'],
                resume_tips: ['Add academic projects', 'Show eagerness to learn', 'Keep it concise (1 page)']
            };
        } else if (experienceLevel === "Intermediate") {
            aiResponse = {
                suggested_roles: ['Software Engineer', 'Full Stack Developer'],
                skill_gaps: ['System Design', 'Cloud Platforms'],
                learning_resources: ['System Design Interview - Alex Xu', 'AWS for Developers'],
                resume_tips: ['Show internships', 'Highlight project impacts', 'Emphasize teamwork']
            };
        } else {
            aiResponse = {
                suggested_roles: ['Tech Lead', 'Solutions Architect'],
                skill_gaps: ['Leadership', 'Scalability Design'],
                learning_resources: ['Leadership in Tech - LinkedIn Learning', 'Designing Data-Intensive Applications'],
                resume_tips: ['Show leadership roles', 'Quantify business outcomes', 'Focus on architecture & strategy']
            };
        }

        res.json({ prompt_type: "Dynamic", prompt_used: dynamicPrompt, plan: aiResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
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
