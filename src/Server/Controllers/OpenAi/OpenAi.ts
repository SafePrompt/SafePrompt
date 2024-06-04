import middleware from '../../Types/middleware'
import openai from '../../Models/openaiModel'

const query: middleware = (req, res, next) => {
    const {prompt: string} = req.body

    // async function main() {
    //     const completion = await openAi.chat.completions.create({
    //       messages: [{ role: "system", content: 'test string to be replaced by prompt'}],
    //       model: "gpt-3.5-turbo",
    //     });
      
    //     console.log(completion.choices[0]);
    //   }

    // main()

    openai.chat.completions.create({
        messages: [{ role: "system", content: 'TBD' }],
        model: "gpt-3.5-turbo",
    })
    .then((response) => {
        res.locals.response = response
        return next()
    })
    .catch((err) => {
        console.log('error with openAI controller')
        return next(err)
    })

}

export default query;