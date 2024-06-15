import express, { Request, Response } from "express";

const router = express.Router();

//place in beginning of route to pull req.body and create response object
import objectCreation from "../Controllers/Validation/objectCreation";

//validation middleware
import phone from "../Controllers/Validation/phone";
import email from "../Controllers/Validation/email";
import keyword from "../Controllers/Validation/keyword";
import address from "../Controllers/Validation/address";
import code from "../Controllers/Validation/code";
import currency from "../Controllers/Validation/currency";
import dictionary from "../Controllers/Validation/dictionary";
import ssn from "../Controllers/Validation/ssn";
import ein from "../Controllers/Validation/ein";

//query storage

import queryStore from "../Controllers/queryStore";

router.post(
    "/",

    objectCreation,
    phone,
    email,
    currency,
    ssn,
    ein,

    keyword,

    (req: Request, res: Response) => {
        res.send(res.locals.object);
    }
);

export default router;
