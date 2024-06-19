import {
    beforeEach,
    afterEach,
    describe,
    it,
    expect,
    jest,
} from "@jest/globals";
import email from "../Server/Controllers/Validation/email";
import { Request, Response, NextFunction } from "express";

describe("Email Unit Test", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock<NextFunction>;

    beforeEach(() => {
        req = {};
        res = {
            locals: {
                prompt: "",
                object: {},
                config: {
                    email: true,
                },
            },
        };
        next = jest.fn();
    });

    afterEach(() => {
        // Reset res.locals!.object after each test case
        res.locals!.object = {};
    });

    it("Should return empty object when no phone number present", () => {
        res.locals!.prompt = "This has no phone number";
        email(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });

    it("Should find emails with standard email format", () => {
        const tests = [
            {
                prompt: "Hello rick@fcasual.co is my email",
                expected: ["rick@fcasual.co"],
            },
            {
                prompt: "Hello my email trina@fi.com",
                expected: ["trina@fi.com"],
            },
            {
                prompt: "H dog@dog.com ello my email",
                expected: ["dog@dog.com"],
            },
        ];

        tests.forEach((test) => {
            res.locals!.prompt = test.prompt;
            email(
                req as Request,
                res as Response,
                next as unknown as NextFunction
            );
            expect(res.locals!.object).toEqual({
                email: test.expected,
            });
            expect(next).toHaveBeenCalled();
        });
    });
});
