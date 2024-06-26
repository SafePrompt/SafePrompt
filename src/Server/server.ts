import express, { Request, Response } from "express";

import validationRouter from "./Routes/validationRouter";
import adminRouter from "./Routes/adminRouter";
import workerRouter from "./Routes/workerRouter";
import configRouter from "./Routes/configRouter";
import GPT from "./Routes/GPT";
import token from "./Controllers/Auth/token";
import cookieParser from "cookie-parser";
import config from "./Controllers/Config/config";
import storageRouter from "./Routes/storageRouter";
import storage from "./Controllers/Storage/storage";

import db from "./Models/db";

import cors from "cors";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/admin", adminRouter);

app.use("/worker", workerRouter);

app.use("/validate", validationRouter);

app.use("/config", configRouter);

app.use("/storage", storageRouter);

app.use("/GPT", GPT);

app.get("/logout", token.removeToken, (req: Request, res: Response) => {
    res.status(200).json({});
});

app.use(
    "/checkToken",
    token.checkToken,
    storage.getPrompts,
    config.request,
    (req: Request, res: Response) => {
        res.status(200).json({
            orgKey: res.locals.key,
            config: res.locals.config,
            username: res.locals.username,
            prompts: res.locals.prompts,
            admin: res.locals.admin,
        });
    }
);

//use this route to query database via postman
app.post("/db", async (req: Request, res: Response): Promise<Response> => {
    try {
        const query: string = req.body.query;

        const response: any = await db.query(query);

        return res.status(200).send(response);
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
