const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3000;

// Replace with your actual Gemini API key
const genAI = new GoogleGenerativeAI("AIzaSyCGVmEHPMFtb-AwjPI1yuxftjhhb0-A4NU");

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userMessage);
    const response = await result.response.text();

    res.json({ reply: response });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating response');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
