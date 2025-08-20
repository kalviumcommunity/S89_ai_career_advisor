
// server.js - Node.js Express version for AI Career Advisor
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST endpoint for career advice
app.post('/career-advice', async (req, res) => {
    try {
        // 1. Get user input
        const { skills, interests, goals } = req.body;

        // 2. Example RAG context (replace with real data or API calls)
        const ragContext = `\nLatest job market trends: AI, Data Science, Cloud Computing.\nTop skills in demand: Python, Machine Learning, Communication.\nRecommended resources: Coursera, edX, LinkedIn Learning.\n`;

        // 3. System prompt (for LLM)
        const systemPrompt = `\nYou are an AI Career Advisor. Analyze the user's skills, interests, and goals. Suggest suitable job roles, identify skill gaps, recommend learning resources, and offer resume tips. Use the context below for accuracy:\n${ragContext}\nFormat output as: roles, skill_gaps, resources, resume_tips.\n`;

        // 4. User prompt
        const userPrompt = `\nUser profile:\n- Skills: ${skills}\n- Interests: ${interests}\n- Goals: ${goals}\n`;

        // 5. Placeholder for AI model call (replace with Gemini/OpenAI API as needed)
        // Example output structure
        const aiResponse = {
            suggested_roles: ['Data Scientist', 'AI Engineer'],
            skill_gaps: ['Deep Learning', 'Cloud Platforms'],
            learning_resources: ['Deep Learning Specialization - Coursera', 'AWS Cloud Practitioner - edX'],
            resume_tips: ['Highlight AI projects', 'Quantify achievements', 'Tailor resume for each job']
        };

        // 6. Return the AI response
        res.json({ plan: aiResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ plan: '', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});