import { Request, Response, NextFunction } from 'express';





export default interface Middleware {

  (req: Request, res: Response, next: NextFunction): void;
  
}

