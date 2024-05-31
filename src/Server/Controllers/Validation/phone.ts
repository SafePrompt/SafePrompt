import {isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength} from 'libphonenumber-js'

import middleware from '../../Types/middleware'

//still need to conditionally check for periods or dashes in wrong spots

const phone: middleware = (req,res,next)=>{

    const { prompt, object } = res.locals as { prompt: string, object: object};

    let failed : string[] = [];

    let digits:string = '';

    for (let i: number = 0; i < prompt.length; i++) {

        digits = '';

        if (!isNaN(Number(prompt[i])) && prompt[i]!==' ' || prompt[i] === '(' || prompt[i] === '+'){
            for(let characters:number = 7; characters<=17; characters++){
 
                digits = prompt.slice(i,i+characters);
             
                if(isValidPhoneNumber(digits, 'US')){
         
                    failed.push(digits);
                    i = i+characters;
                }
              
            }
           
        } 
      
    }

    let badIndex: number[];

    if (failed.length > 0){

        //checking for misplaced periods, dashes

        failed = failed.filter((str:string) : boolean => {
            if (str.includes('-')||str.includes('.')){            
                if (str[0] === '('){
                    badIndex = [0,1,2,3,4,6,7,10,11,12];
                    if (!(str[5] === " " || str[5] === "-")) {
                        badIndex.push(5);
                    } 
                    for (let el of badIndex){
                        if (str[el] === '.' || str[el] ==='-'){
                            return false;
                        }
                    }
                    return true;            
                }
                else if (str.length === 11){
                    return false;
                }
                else{
                    badIndex = [0,1,2,4,5,6,8,10,11]
                    for (let el of badIndex){
                        if (str[el] === '.' || str[el] ==='-'){
                            return false;
                        }
                    }
                    return true;
                }
            } else {
                return true;
            }
        }).filter((str:string): boolean =>{
            if (str.includes('(') && !str.includes(')')) return false;
            else if (str.includes('-') && str.includes('.')) return false;
            else return true;
        })

        //if there are still phone numbers that exist at this point, place them on object
       if (failed.length > 0) res.locals.object = {...object, phone: failed}
    }
   
    return next()
    
}

export default phone