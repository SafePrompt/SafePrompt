import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import ssn from "../Server/Controllers/Validation/ssn";
import { Request, Response, NextFunction } from "express";

describe("SSN Unit Tests", () => {
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
                    ssn: true,
                },
            },
        };
        next = jest.fn();
    });

    it("Should return an empty object when no ssn is present", () => {
        res.locals!.prompt = "There is no ssn here";
        ssn(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });

    it("Should correctly find ssn in middle of string", () => {
        res.locals!.prompt = "There is one 182-23-1234 ssn here";
        ssn(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ssn: ['182-23-1234']});
        expect(next).toHaveBeenCalled();
        res.locals!.prompt = "There 123-23-4321 is one  ssn here";
        ssn(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ssn: ['123-23-4321']});
        expect(next).toHaveBeenCalled();
        res.locals!.prompt = "There is one  ssn851-23-8212 here";
        ssn(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ssn: ['851-23-8212']});
        expect(next).toHaveBeenCalled();
    });

    it('Should find SSN at end of string', ()=>{
        res.locals!.prompt = 'hello this string ends with 181-23-8532'
        ssn(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ssn: ['181-23-8532']})
        expect(next).toHaveBeenCalled();
    })

    it('Should find SSN at beginning of string', ()=>{
        res.locals!.prompt = '181-23-8532hello this string ends with'
        ssn(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ssn: ['181-23-8532']})
        expect(next).toHaveBeenCalled();
    })

    it("Should find multiple SSN's in string", ()=>{
        res.locals!.prompt = '183-84-8532 and the other is 842-83-7543 as well as 851-83-8523';
        ssn(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({ssn: ['183-84-8532','842-83-7543','851-83-8523']})
        expect(next).toHaveBeenCalled();
    })

    it('Should ignore SSN if space instead of dash', ()=>{
        res.locals!.prompt = '181 23 8532hello this string ends with'
        ssn(req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({})
        expect(next).toHaveBeenCalled();
    })
});
