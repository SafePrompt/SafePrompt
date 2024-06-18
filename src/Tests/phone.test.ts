import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import phone from "../Server/Controllers/Validation/phone";
import { Request, Response, NextFunction } from "express";

describe("Phone Unit Tests", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock<NextFunction>;

    // set the input fields to blank
    beforeEach(() => {
        req = {};
        res = {
            locals: {
                prompt: "",
                object: {},
                config: {
                    phone: true,
                },
            },
        };
        next = jest.fn();
    });

    it("should not modify res.locals.object when no phone number is found", () => {
        res.locals!.prompt = "a string sans numbers";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(JSON.stringify(res.locals!.object)).toEqual(JSON.stringify({}));
        expect(next).toHaveBeenCalled();
    });

    it("should detect 123-456-7890", () => {
        res.locals!.prompt = "a string with a phone number 123-456-7890";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ phone: ["123-456-7890"] });
    });

    it("should detect (123)-456-7890", () => {
        res.locals!.prompt = "a string with a phone number (123)-456-7890";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ phone: ["(123)-456-7890"] });
    });

    it("should detect (123)456-7890", () => {
        res.locals!.prompt = "a string with a phone number (123)456-7890";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ phone: ["(123)456-7890"] });
    });

    it("should detect 1234567890", () => {
        res.locals!.prompt = "a string with a phone number 1234567890";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ phone: ["1234567890"] });
    });

    it("should detect 123 456 7890", () => {
        res.locals!.prompt = "a string with a phone number 123 456 7890";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ phone: ["123 456 7890"] });
    });

    it("should detect 123 456 7890", () => {
        res.locals!.prompt = "a string with a phone number 123.456.7890";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ phone: ["123.456.7890"] });
    });

    it("should detect +1 585 712 5306", () => {
        res.locals!.prompt = "a string with a phone number +1 585 712 5306";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ phone: ["+1 585 712 5306"] });
    });

    it("should detect (454) 122-122", () => {
        res.locals!.prompt =
            "a string with a phone number (454) 122-1222 hello";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ phone: ["(454) 122-1222"] });
    });

    it("should detect multiple phone numbers", () => {
        res.locals!.prompt =
            "a string with 585-222-2312 a and +1 232 232 8888 phone 585 123 1211 number";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({
            phone: ["585-222-2312", "+1 232 232 8888", "585 123 1211"],
        });
    });

    it("should not modify res.locals.object when a non-phone number number is passed in", () => {
        res.locals!.prompt =
            "At $20,000.00 Codesmith is more than a little overpriced.";
        phone(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });

    // it("should not identify $1234567890 as phone number", () => {
    //     res.locals!.prompt =
    //         "At $1234567890 little overpriced.";
    //     phone(req as Request, res as Response, next as unknown as NextFunction);
    //     expect(res.locals!.object).toEqual({});
    //     expect(next).toHaveBeenCalled();
    // });
});
