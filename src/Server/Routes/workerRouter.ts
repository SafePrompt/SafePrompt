import express, { Request, Response } from "express";
import worker from "../Controllers/Auth/worker";
import config from "../Controllers/Config/config";
import token from "../Controllers/Auth/token";
import storage from "../Controllers/Storage/storage";

const router = express.Router();

router.post(
    "/signup",
    worker.signup,
    token.setToken,

    (req, res) => {
        res.status(200).json({ key: res.locals.key });
    }
),
    router.post(
        "/login",
        worker.login,
        config.request,
        token.setToken,
        storage.getPrompts,

        (req, res) => {
            res.status(200).json({
                key: res.locals.key,
                config: res.locals.config,
                prompts: res.locals.prompts,
            });
        }
    );

export default router;
