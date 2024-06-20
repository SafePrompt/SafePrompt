import express, { Request, Response } from "express";
import admin from "../Controllers/Auth/admin";
import config from "../Controllers/Config/config";
import token from "../Controllers/Auth/token";
import storage from "../Controllers/Storage/storage";

const router = express.Router();

router.post(
    "/signup",
    admin.signup,
    config.initialize,
    token.setToken,
    (req, res) => {
        res.status(200).json({ key: res.locals.key, admin: true });
    }
);

router.post(
    "/login",
    admin.login,
    token.setToken,
    config.request,
    storage.getPrompts,
    (req, res) => {
        res.status(200).json({
            key: res.locals.key,
            config: res.locals.config,
            prompts: res.locals.prompts,
            admin: true,
        });
    }
);

export default router;
