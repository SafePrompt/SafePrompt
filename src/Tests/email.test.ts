import { beforeEach, describe, it, expect, jest } from "@jest/globals";
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
                object: {},
                prompt: "",
                config: {
                    email: true,
                },
            },
        };
        next = jest.fn();
    });

    it("Should return empty object when no phone number present", () => {
        res.locals!.prompt = "This has no phone number";
        email(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });

    it("Should find emails with standard email format", () => {

        res.locals!.prompt = "Hello rick@fastcasual.co is my email";
        email(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ email: ["rick@fastcasual.co"] });
        expect(next).toHaveBeenCalled();
    });
});
