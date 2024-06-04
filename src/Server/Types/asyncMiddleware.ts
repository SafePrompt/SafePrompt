import { Request, Response, NextFunction } from 'express';

export default interface AsyncMiddleware {

  (req: Request, res: Response, next: NextFunction): Promise<void>

}