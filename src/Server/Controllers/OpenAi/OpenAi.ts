import middleware from '../../Types/middleware'
import {Request, Response} from 'express'
import openai from '../../Models/openaiModel'

const query: middleware = (req, res, next) => {
    const prompt: string|undefined = req.body.prompt

    console.log('reached GPT query middleware with prompt: ', prompt)

    openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
    })
    .then((response: any) => {
        console.log('reached response from chatGPT. Response: ', response.choices[0].message.content)
        res.locals.response = response.choices[0].message.content
        return next()
    })
    .catch((err: Error) => {
        console.log('error with openAI controller')
        return next(err)
    })

}

export default query;