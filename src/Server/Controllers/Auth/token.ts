import AsyncMiddleware from "../../Types/asyncMiddleware";
import Middleware from "../../Types/middleware";
import db from "../../Models/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtKey: string = process.env.JWT_KEY || "";

const token = {
    setToken: (req, res, next) => {
        const username: string = res.locals.username;

        const role: string = res.locals.role;

        const token: string = jwt.sign(
            { username: username, role: role },
            jwtKey,
            { expiresIn: "48h" }
        );

        res.cookie("jwtToken", token, {
            maxAge: 345600000,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });

        return next();
    },

    checkToken: async (req, res, next) => {
        try {
            const jwtToken: string = req.cookies.jwtToken;

            if (!jwtToken) {
                return res.status(401).json({});
            } else {
                interface decoded {
                    username: string;
                    role: string;
                }

                interface dbResponse {
                    username: string;
                    password: string;
                    key: string;
                    admin: boolean;
                }
                const decoded: JwtPayload | string = jwt.verify(
                    jwtToken,
                    jwtKey
                ) as JwtPayload;

                const username: string = decoded.username;
                const admin: boolean = decoded.role === "admin";

                const exists = await db.query(
                    'SELECT * FROM "user" WHERE username = $1 AND admin = $2',
                    [username, admin]
                );
                const row: dbResponse[] = exists.rows;

                if (row.length === 1) return res.status(200).json({});
            }

            return res.status(401).json({});
        } catch (error) {
            return next(error);
        }
    },
} as { setToken: Middleware; checkToken: AsyncMiddleware };

export default token;
