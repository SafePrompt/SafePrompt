import middleware from '../../Types/middleware'

const ein: middleware = (req, res, next) => {

    try{

        const config = res.locals.config;
        if (!config.ein) return next();

        const prompt:string = res.locals.prompt;

        const unexclusiveEinFormat = /\d{2}-\d{7}/;

        //if prompt includes at least 1 ein
        if (unexclusiveEinFormat.test(prompt)){

            const failed: string[] = [];

            const einFormat = /^\d{2}-\d{7}$/;
            const exclude = /[123456789-]/;

            //iterate through prompt finding all eins
            for (let i = 0; i < prompt.length; i++){
                const test:string = prompt.slice(i,i+10);
                if (einFormat.test(test) && !exclude.test(prompt[i-1]) && !exclude.test(prompt[i+10])){
                    failed.push(test)
                }
            }

            //and add to response object
            if (failed.length > 0){
                res.locals.object = {...res.locals.object, ein: failed}
            }

        }

        return next()


    }catch(error){
        return next(error)
    }

}

export default ein;