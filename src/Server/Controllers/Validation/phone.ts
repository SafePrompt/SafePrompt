import {isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength} from 'libphonenumber-js'

import middleware from '../../Types/middleware'


const phone: middleware = (req,res,next)=>{

    try{

        let prompt: string = res.locals.prompt;
        const failed: string[] = [];

        const phone1:RegExp = /\d{10}/;
        const phone2:RegExp = /\d{3}-\d{3}-\d{4}/;
        const phone3:RegExp = /\(\d{3}\)\d{3}-\d{4}/;
        const phone4:RegExp = /\(\d{3}\)-\d{3}-\d{4}/;
        const phone5:RegExp = /\d{3}.\d{3}.\d{4}/;
        const phone6:RegExp = /\d{3} \d{3} \d{4}/;
        const phone7:RegExp = /\(\d{3}\) \d{3} \d{4}/;
        const phone8:RegExp = /\+\d{11}/;
        const phone9:RegExp = /\+\d{1} \d{3}.\d{3}.\d{4}/;
        const phone10:RegExp = /\+\d{1} \d{3}-\d{3}-\d{4}/;
        const phone11:RegExp = /\+\d{1} \(\d{3}\) \d{3} \d{4}/;
        const phone12:RegExp = /\+\d{12}/;

        if (phone1.test(prompt) || phone2.test(prompt) || phone3.test(prompt) || phone4.test(prompt) || phone5.test(prompt) || phone6.test(prompt) || phone7.test(prompt) || phone8.test(prompt) || phone9.test(prompt) || phone10.test(prompt) || phone11.test(prompt) || phone12.test(prompt)){
            
            let i:number = 0;
            const startExp: RegExp = /[1234567890+(]/

            while (phone1.test(prompt) || phone2.test(prompt) || phone3.test(prompt) || phone4.test(prompt) || phone5.test(prompt) || phone6.test(prompt) || phone7.test(prompt) || phone8.test(prompt) || phone9.test(prompt) || phone10.test(prompt) || phone11.test(prompt) || phone12.test(prompt)){

                if(startExp.test(prompt[i])){
                    
                    if (phone1.test(prompt.slice(i,i+10))){

                        failed.push(prompt.slice(i,i+10));
                        prompt = prompt.slice(i+10);
                        i=0;

                    }else if (phone2.test(prompt.slice(i,i+12))){

                        failed.push(prompt.slice(i,i+12));
                        prompt = prompt.slice(i+12);
                        i=0;

                    }else if (phone3.test(prompt.slice(i,i+13))){

                        failed.push(prompt.slice(i, i+13));
                        prompt = prompt.slice(i+13);
                        i=0;

                    }else if (phone4.test(prompt.slice(i,i+14))){

                        failed.push(prompt.slice(i, i+14));
                        prompt = prompt.slice(i+14);
                        i=0;

                    }else if (phone5.test(prompt.slice(i,i+12))){

                        failed.push(prompt.slice(i, i+12));
                        prompt = prompt.slice(i+12);
                        i=0;
                    
                    }else if (phone6.test(prompt.slice(i,i+12))){

                        failed.push(prompt.slice(i, i+12));
                        prompt = prompt.slice(i+12);
                        i=0;

                    }else if (phone7.test(prompt.slice(i,i+14))){

                        failed.push(prompt.slice(i, i+14));
                        prompt = prompt.slice(i+14);
                        i=0;

                    }else if (phone8.test(prompt.slice(i,i+12))){

                        failed.push(prompt.slice(i, i+12));
                        prompt = prompt.slice(i+12);
                        i=0;
                    
                    }else if (phone9.test(prompt.slice(i,i+15))){

                        failed.push(prompt.slice(i, i+15));
                        prompt = prompt.slice(i+15);
                        i=0;

                    }else if (phone10.test(prompt.slice(i,i+15))){

                        failed.push(prompt.slice(i, i+15));
                        prompt = prompt.slice(i+15);
                        i=0;
                    
                    }else if (phone11.test(prompt.slice(i,i+17))){

                        failed.push(prompt.slice(i, i+17));
                        prompt = prompt.slice(i+17);
                        i=0;
                    
                    }else if (phone12.test(prompt.slice(i,i+13))){
 
                        failed.push(prompt.slice(i, i+13));
                        prompt = prompt.slice(i+13);
                        i=0;
                    }

                    else {i++
                    }
                }else{
                    i++
                }  
             }
    }

    if (failed.length > 0) res.locals.object = {...res.locals.object, phone: failed}

    return next();

  }catch(error){
    return next(error);
  }
    
}

export default phone