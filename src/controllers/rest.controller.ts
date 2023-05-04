import {NextFunction, Request, Response} from "express";

export default class RestController {

    /**
     * @param req
     * @param res
     * @param next
     */
    static async generateImage(req: Request, res: Response, next: NextFunction) {
        return res.send({status: 200, message: 'Hello World!'}).status(200);
    }
}