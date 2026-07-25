import { Multer } from "multer"; 
declare namespace Express {
  export interface Request {
    userId: string;
    file?: Multer.file;
  }
}