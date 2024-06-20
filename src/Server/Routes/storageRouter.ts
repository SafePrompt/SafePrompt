import express, { Request, Response } from "express";
import query from "../Controllers/OpenAi/OpenAi";

const router = express.Router();

router.post("/storePrompt", query, (req, res) => {
    //    res.status(200).send(res.locals.response)
});


router.post("/getPrompts", query, (req, res) => {
    //    res.status(200).send(res.locals.response)
});

export default router;
