import {isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength} from 'libphonenumber-js'

import middleware from '../../Types/middleware'

//still need to conditionally check for periods or dashes in wrong spots

const phone: middleware = (req,res,next)=>{

    const { prompt, object } = res.locals as { prompt: string, object: object}

    const failed : string[] = []

    let digits:string = ''

    for (let i: number = 0; i < prompt.length; i++) {
        digits = ''

        if (!isNaN(Number(prompt[i])) && prompt[i]!==' ' || prompt[i] === '(' || prompt[i] === '+'){
            for(let characters:number = 10; characters<=17; characters++){
 
                digits = prompt.slice(i,i+characters)

                if(isValidPhoneNumber(digits, 'US')){
                    failed.push(digits)
                    i = i+characters
                }
              
            }
           
        } 
      
    }

    if (failed.length > 0){
        res.locals.object = {...object, phone: failed}
    }
   
    return next()
    
}

export default phone
