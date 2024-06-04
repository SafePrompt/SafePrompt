import middleware from '../../Types/middleware'

const currency: middleware = (req, res, next) => {
    
    try{
        let prompt: string = res.locals.prompt;
        const currencyRegEx: RegExp = /[$€¥£₹₽₩₺₪₫฿₴₦₵₣₤₧₱ƒ₲₡₭₸₮៛؋₿]/;

        let failed : string[] = [];

        //checks if money symbol exists in prompt string
        while (currencyRegEx.test(prompt)){

            //checks each individual value to see if it is a money symbol
            if(currencyRegEx.test(prompt[0])){

                let i : number = 1;
                const moneySyntax: RegExp = /[0123456789 .]/;

                //if so, finds entire currency string by iterating through prompt from 1 checking for money syntax
                while(moneySyntax.test(prompt[i])) i++;

                failed.push(prompt.slice(0,i).trim())

                //reassigns prompt to the remaining unchecked prompt
                prompt = prompt.slice(i);

            }else{
                prompt = prompt.slice(1);
            }
        }

        failed = failed.filter(value=>value.length > 1);

        if (failed.length > 0){

            //check if a currency value was mistakenly added to phone, and if so remove the phone number
            if (res.locals.object.phone){

                const phoneSyntax: RegExp = /[()-. ]/;
                const phoneNumbers: string[] = res.locals.object.phone.filter((phone:string)=>!phoneSyntax.test(phone))

                for (let i:number = 0; i < phoneNumbers.length; i++){
                    for (let index:number = 0; index < failed.length; index++){
                        if (phoneNumbers[i] === failed[index].slice(1)){
                            res.locals.object.phone = res.locals.object.phone.filter((numb:string)=> numb !== failed[index].slice(1))
                        }
                    }
                }
            
            }

            res.locals.object = {...res.locals.object, currency: failed};
        }
        return next();
    }
    catch(error){
        return next(error);
    }

}

export default currency;