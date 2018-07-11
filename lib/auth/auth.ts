import { Request, Response, Router } from "express";

//Here, will be checking user credentials, sessions and tokens.
class Auth {

    public authenticate(req: Request, res: Response, next: Function): any {
        console.log('Separate middleware was invoked!');
        next();
    }
}

export default new Auth();