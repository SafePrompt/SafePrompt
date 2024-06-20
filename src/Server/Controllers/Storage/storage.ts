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

            // const response = await db.query(
            //     "INSERT INTO storage (username, prompt, key) VALUES ($1, $2, $3)",
            //     [username, prompt, key]
            // );
            const response = await db.query(
                `WITH inserted AS (
                    INSERT INTO storage (username, prompt, key)
                    VALUES ($1, $2, $3)
                    RETURNING *
                )
                SELECT prompt FROM storage WHERE username = $1 AND key = $3`,
                [username, prompt, key]
            );

            if (response.rows.length > 0) {
                res.locals.prompts = response.rows
                    .map((prompt) => prompt.prompt)
                    .reverse();
            }

            return next();
        } catch (error) {
            return next(error);
        }
    },
    getPrompts: async (req, res, next) => {
        try {
            const key: string = res.locals.key;

            const username: string = res.locals.username;

            const response = await db.query(
                'SELECT prompt FROM storage WHERE username = $1 AND "key" = $2',
                [username, key]
            );

            if (response.rows.length > 0) {
                res.locals.prompts = response.rows
                    .map((prompt) => prompt.prompt)
                    .reverse();
            }

            return next();
        } catch (error) {
            return next(error);
        }
    },
} as {
    storePrompt: AsyncMiddleware;
    getPrompts: AsyncMiddleware;
};

export default storage;
