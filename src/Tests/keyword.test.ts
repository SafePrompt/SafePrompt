import {
    beforeEach,
    afterEach,
    jest,
    expect,
    describe,
    it,
} from "@jest/globals";
import keyword from "../Server/Controllers/Validation/keyword";
import { Request, Response, NextFunction } from "express";
import db from "../Server/Models/db";
import { Query, QueryResult } from "pg";

jest.mock("../Server/Models/db", () => {
    return {
        query: jest.fn(),
    };
});

describe("Keyword Unit Test", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock<NextFunction>;

    beforeEach(() => {
        req = {};
        res = {
            locals: {
                prompt: "",
                key: "9d8e3987-4cd7-49f9-90b8-c28783e857ea",
                object: {},
                config: {
                    keyword: true,
                },
            },
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    interface dbrow {
        id: number;
        keyword: string;
        key: string;
        type: string;
    }

    interface dbResponse {
        rows: dbrow[];
    }

    const mockDbResponse: dbResponse = {
        rows: [
            {
                id: 3799,
                keyword: "Los Angeles",
                key: "9d8e3987-4cd7-49f9-90b8-c28783e857ea",
                type: "Location",
            },
            {
                id: 3800,
                keyword: "New York",
                key: "9d8e3987-4cd7-49f9-90b8-c28783e857ea",
                type: "Location",
            },
            {
                id: 3801,
                keyword: "Donald",
                key: "9d8e3987-4cd7-49f9-90b8-c28783e857ea",
                type: "Person",
            },
            {
                id: 3802,
                keyword: "Joe",
                key: "9d8e3987-4cd7-49f9-90b8-c28783e857ea",
                type: "Person",
            },
        ],
    };

    it("Should return empty object when no keywords are present", () => {
        (db.query as jest.Mock).mockReturnValue(mockDbResponse);
        res.locals!.prompt = "Hello there is no keywords present";
        keyword(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({});
    });

    it("Should return keywords in middle of string", () => {
        (db.query as jest.Mock).mockReturnValue(mockDbResponse);
        res.locals!.prompt = "Hello there is Los Angeles no keywords present";
        keyword(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );

        console.log(res.locals!.object);
        console.log(res.locals!.key);
        expect(res.locals!.object).toEqual({
            keyword: [{ found: "Los Angeles", type: "Location" }],
        });
    });
});
