import * as express from 'express-serve-static-core'

declare global {
    namespace Express {
        interface Request {
            admin ?: string;
            user ?: string
        }
    }
}
export interface adminLogin {
    email:string;
    password:string
}

export interface adminRegister{
    name:string;
    email:string;
    password:string;
    phonenumber:string;
}