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
    })

})
