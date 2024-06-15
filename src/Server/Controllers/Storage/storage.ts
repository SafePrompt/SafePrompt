import AsyncMiddleware from "../../Types/asyncMiddleware";
import db from "../../Models/db";

interface Storage {
    id: number;
    username: string;
    prompt: string;
}

const storage = {
    storePrompt: async (req, res, next) => {
        try {
            const username: string = res.locals.user;
            const prompt: string = res.locals.prompt;
            const key: string = res.locals.key;

            console.log("about to store prompt");

            const response = await db.query(
                "INSERT INTO storage (username, prompt, key) VALUES ($1, $2, $3)",
                [username, prompt, key]
            );

            console.log(response);
            return next();
        } catch (error) {
            return next(error);
        }
    },
    getPrompts: async (req, res, next) => {
        const username: string = res.locals.user;

        const response = await db.query(
            "SELECT prompt FROM storage WHERE USERNAME = $1",
            [username]
        );

        console.log(response.rows);
        return next();
    },
} as {
    storePrompt: AsyncMiddleware;
    getPrompts: AsyncMiddleware;
};

export default storage;
