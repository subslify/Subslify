import { Request } from "express";
export interface IControllerRequest extends Request {
  user: { id: string }
};