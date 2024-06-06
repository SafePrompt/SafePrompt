import middleware from '../../Types/middleware'

const email:middleware = (req,res,next)=>{

    try{

        const prompt:string = req.body.prompt;

        if (prompt.includes('@')){

            const failed: string[] = [];

            const words :string[] = prompt.split(" ");

            for (let i:number = 0; i < words.length; i++){

                /*
                check all strings to see if any are email addresses:

                will fail if:
                -does not include '@'
                -includes characters that aren't 'a-z', 'A-Z', '@' or '.'
                -does not include at least one '.'
                -the first character is an '@'
                -the last character is an '@'

                */

                if (words[i].includes('@') && !/[^a-zA-Z@.]+/.test(words[i]) && words[i][0]!== '@' && words[i][words[i].length-1] !== '@' && words[i].includes('.')){
                    failed.push(words[i])
                }

            }

            //if any email addresses exist, place them on the response object
            if (words.length > 0){
                res.locals.object = {...res.locals.object, email: failed}
            }
            return next()

        } else {
            return next()
        }
    }catch(error){
        return next(error)
    }
}

export default email;