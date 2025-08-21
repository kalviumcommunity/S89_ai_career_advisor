// server.js - Zero Shot Prompting Example
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST endpoint for career advice with Zero-Shot Prompting
app.post('/career-advice-zero-shot', async (req, res) => {
    try {
        // 1. Get user input
        const { skills, interests, goals } = req.body;

        // 2. Zero-Shot Prompt (no examples, only instruction)
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

        // 3. Simulate AI response (replace with real Gemini/OpenAI API later)
        // Here we pretend the AI understood the zero-shot prompt
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

        // 4. Return AI response
        res.json({ prompt_used: zeroShotPrompt, plan: aiResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ plan: '', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
