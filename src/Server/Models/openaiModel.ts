const OpenAI = require('openai')
import dotenv from 'dotenv';
dotenv.config();

const {OPENAI_API_KEY} = process.env;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

module.exports = openai