import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import currency from "../Server/Controllers/Validation/currency";
import { Request, Response, NextFunction } from "express";

describe("Currency Unit Test", () => {
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
                    currency: true,
                },
            },
        };
        next = jest.fn();
    });

    it("Should not modify res.locals.object when no currency is found", () => {
        res.locals!.prompt = "a string sans numbers";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });
    it("Should not modify res.locals.object when config.currency is false", () => {
        res.locals!.config.currency = false;
        res.locals!.prompt = "a string with $1000 numbers";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });

    it("Should detect $10000 and add to response object", () => {
        res.locals!.prompt = "a string with currency $10000 and more";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );

        expect(res.locals!.object).toEqual({ currency: ["$10000"] });
        expect(next).toHaveBeenCalled();
    });
    it("Should detect $10,000 and add to response object", () => {
        res.locals!.prompt = "a string with currency $10,000 and more";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );

        expect(res.locals!.object).toEqual({ currency: ["$10,000"] });
        expect(next).toHaveBeenCalled();
    });
    it("Should detect $100.00 and add to response object", () => {
        res.locals!.prompt = "a string with currency $100.00 and more";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );

        expect(res.locals!.object).toEqual({ currency: ["$100.00"] });
        expect(next).toHaveBeenCalled();
    });
    it("Should detect $  10000 regardless of space", () => {
        res.locals!.prompt = "a string with currency $  10000 and more";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({ currency: ["$  10000"] });
        expect(next).toHaveBeenCalled();
    });

    it("Should exclude 10000 since no currency indicator", () => {
        res.locals!.prompt = "a string with currency 10000 and more";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });

    it("Should detect $.32 with only cents", () => {
        res.locals!.prompt = "a string with currency $.32 and more";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({ currency: ["$.32"] });
        expect(next).toHaveBeenCalled();
    });

    it("Should detect currency at beginning of prompt", () => {
        res.locals!.prompt = "$5.00 string with currency and more";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({ currency: ["$5.00"] });
        expect(next).toHaveBeenCalled();
    });
    it("Should detect currency at end of prompt", () => {
        res.locals!.prompt = "string with currency and more $5";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({ currency: ["$5"] });
        expect(next).toHaveBeenCalled();
    });

    it("Should detect multiple currencies in a prompt", () => {
        res.locals!.prompt = "string with $13.00 currency and more $5";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({ currency: ["$13.00", "$5"] });
        expect(next).toHaveBeenCalled();
    });

    //$€¥£₹₽₩₺₪₫฿₴₦₵₣₤₧₱ƒ₲₡₭₸₮៛؋₿
    it("Should detect foreign currencies", () => {
        res.locals!.prompt = "string with currency and more €5";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({ currency: ["€5"] });
        expect(next).toHaveBeenCalled();
        res.locals!.prompt = "string with currency and more ¥5";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({ currency: ["¥5"] });
        expect(next).toHaveBeenCalled();
        res.locals!.prompt = "string with currency and more ₧5.000";
        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({ currency: ["₧5.000"] });
        expect(next).toHaveBeenCalled();
    });

    it("Should remove accidental phone numbers", () => {
        res.locals!.prompt =
            "string $1234567890 with more";
        res.locals!.object = { phone: ["1234567890"] };

        currency(
            req as Request,
            res as Response,
            next as unknown as NextFunction
        );
        expect(res.locals!.object).toEqual({
            currency: ["$1234567890"],
            phone: [],
        });
        expect(next).toHaveBeenCalled();
    });
});
