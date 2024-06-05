import OpenAI from 'openai'
import dotenv from 'dotenv';
dotenv.config();

// const {OPENAI_API_KEY} = process.env;

interface openAiConfig {
    apiKey: string|undefined
}

const key :string | undefined = process.env.OPENAI_API_KEY;

const obj : openAiConfig = {
    apiKey: key
}

const openai: any = new OpenAI(obj);

export default openai
