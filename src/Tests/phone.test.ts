import { beforeEach, describe, it, expect, jest } from '@jest/globals';
import phone from '../Server/Controllers/Validation/phone'
import { Request, Response, NextFunction } from 'express';


describe('phone middleware', () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let next: jest.Mock<NextFunction>

    // set the input fields to blank
    beforeEach(() => {
        req = {}
        res = {
            locals: {
                prompt: '',
                object: {}
            }
        }
        next = jest.fn()
    })

    it('should not modify res.locals.object when no phone number is found', () =>{
        res.locals!.prompt = 'a string sans numbers';
        phone (req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    });

    it('should return an updated res.locals.object with a phone number is found', () => {
        res.locals!.prompt = 'a string with a phone number (123)-456-7890'
        phone (req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({phone: ['(123)-456-7890']});
        expect(next).toHaveBeenCalled();
    })

    it('should not modify res.locals.object when a non-phone number number is passed in', () =>{
        res.locals!.prompt = 'At $20,000.00 Codesmith is more than a little overpriced.';
        phone (req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    })

})
