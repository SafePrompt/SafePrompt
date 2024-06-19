import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import ein from "../Server/Controllers/Validation/ein";
import { Request, Response, NextFunction } from "express";

describe("EIN unit test", () => {
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
                    ein: true,
                },
            },
        };
        next = jest.fn();
    });

    it("Should send blank response object when no ein is present", () => {
        res.locals!.prompt = "Hello there is no EIN present";
        ein(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });

    it("Should correctly find an ein in middle of string", () => {
        res.locals!.prompt = "Hello there 18-1234568 present";
        ein(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ ein: ["18-1234568"] });
        expect(next).toHaveBeenCalled();
    });

    it("Should correctly find an ein at beginning of string", () => {
        res.locals!.prompt = "18-1234568Hello there present";
        ein(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ ein: ["18-1234568"] });
        expect(next).toHaveBeenCalled();
    });

    it("Should correctly find an ein at end of string", () => {
        res.locals!.prompt = "Hello there present18-1234568";
        ein(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ ein: ["18-1234568"] });
        expect(next).toHaveBeenCalled();
    });

    it("Should correctly find multiple ein's", () => {
        res.locals!.prompt = "Hello 18-1234567 and 15-8532173 are here";
        ein(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({
            ein: ["18-1234567", "15-8532173"],
        });
        expect(next).toHaveBeenCalled();
    });

    it("Should ignore ein if space instead of -", () => {
        res.locals!.prompt = "Hello 18 1234567 and 15 8532173 are here";
        ein(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });
});
