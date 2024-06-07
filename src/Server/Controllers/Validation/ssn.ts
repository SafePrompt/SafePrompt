import middleware from '../../Types/middleware'

const ssn: middleware = (req, res, next) => {
    try{

        const config = req.body.config;
        if (!config.ssn) return next();

        const prompt:string = res.locals.prompt;

        const numbersRegEx = /[123456789]/;

        if (numbersRegEx.test(prompt) && prompt.includes('-')){

            const failed: string[] = [];

            const ssnFormat = /^\d{3}-\d{2}-\d{4}$/;
            const exclude = /[123456789-]/;

            for (let i = 0; i < prompt.length; i++){
                const test:string = prompt.slice(i,i+11);
                if (ssnFormat.test(test) && !exclude.test(prompt[i-1]) && !exclude.test(prompt[i+11])){
                    failed.push(test);
                }
            }

            if (failed.length > 0){
                res.locals.object = {...res.locals.object, ssn: failed};
            }

        }
        return next();

    }catch(error){
        return next(error);
    }

}

export default ssn;