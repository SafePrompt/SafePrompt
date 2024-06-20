import { Request, Response, NextFunction } from "express";
import db from "../../Models/db";

import AsyncMiddleware from "../../Types/asyncMiddleware";
import Keyword from "../../Types/db";
import { Query, QueryResult } from "pg";

const keyword: AsyncMiddleware = async (req, res, next) => {
    try {
        const config = res.locals.config;
        if (!config.keyword) return next();

        const prompt: string = res.locals.prompt;

        const key: string = res.locals.key;

        //query database for keywords
        const results: QueryResult = await db.query(
            `SELECT * FROM keyword WHERE key = $1`,
            [key]
        );

        console.log("results:", results);
        const keywordsFull: Keyword[] = results.rows;

        //remove all unnecessary data

        interface mappedObj {
            found: string;
            type: string | null;
        }

        const failed: mappedObj[] = [];

        const keywords: mappedObj[] = keywordsFull.map(
            (obj: Keyword): mappedObj => {
                return { found: obj.keyword, type: obj.type };
            }
        );

        //checks if organization has keywords
        if (keywords.length > 0) {
            for (let i: number = 0; i < keywords.length; i++) {
                //checks if prompt has organizations keywords
                if (
                    prompt
                        .toLowerCase()
                        .indexOf(keywords[i].found.toLowerCase()) !== -1
                ) {
                    const ind: number = prompt
                        .toLowerCase()
                        .indexOf(keywords[i].found.toLowerCase());

                    //makes sure keyword isn't part of a larger word (example 'hell' and 'shell')
                    //will still keep words that start with keyword (example 'build' and 'building', 'builds', 'builder')

                    if (/^[a-zA-Z]+$/.test(prompt[ind - 1])) {
                        break;
                    }

                    //adds any failed keywords to failed array in case sensativity of the original prompt

                    const failedKeyword: string = prompt.slice(
                        ind,
                        ind + keywords[i].found.length
                    );
                    failed.push({
                        found: failedKeyword,
                        type: keywords[i].type,
                    });
                }
            }

            const filteredFailed = failed.filter((f) => f.type !== null) as {
                found: string;
                type: string;
            }[];

            //if there are any failed characters, add them to response object

            if (filteredFailed.length > 0) {
                console.log("filteredFailed: ", filteredFailed);

                for (let i: number = 0; i < filteredFailed.length; i++) {
                    if (filteredFailed[i].type !== "null") {
                        const type = filteredFailed[i].type.toLowerCase();
                        if (!res.locals.object[type]) {
                            res.locals.object[type] = [];
                        }
                        res.locals.object[type].push(filteredFailed[i].found);
                    }
                }
            }
            // res.locals.object = { ...res.locals.object, keyword: failed };
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

export default keyword;
