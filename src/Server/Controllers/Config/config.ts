import AsyncMiddleware from "../../Types/asyncMiddleware";

const config = {

    submit: async (req,res,next)=>{

        const {address, currency, ein, email, keyword, phone, ssn} : {address: string, currency: string, ein: string, email: string, keyword: string, phone: string, ssn: string} = req.body;

        const keywords: string[] = keyword.split(',').map((word:string):string=>word.trim());





    },

    pull: async (req,res,next) => {



    }



} as {
    submit: AsyncMiddleware,
    pull: AsyncMiddleware
}

export default config;