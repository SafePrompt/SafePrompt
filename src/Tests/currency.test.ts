import { beforeEach, describe, it, expect, jest } from '@jest/globals';
import currency from '../Server/Controllers/Validation/currency'
import { Request, Response, NextFunction } from 'express';

describe('currency middleware', () => {
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

    it('should not modify res.locals.object when no currency is found', () =>{
        res.locals!.prompt = 'a string sans numbers';
        currency (req as Request, res as Response, next as unknown as NextFunction);
        expect(res.locals!.object).toEqual({});
        expect(next).toHaveBeenCalled();
    })

})