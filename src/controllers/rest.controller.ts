import {NextFunction, Request, Response} from "express";
import RewatchService from "../services/rewatch.service";

export default class RestController {

    /** @private rewatchService: RewatchService */
    private readonly rewatchService: RewatchService;

    constructor() {
        this.rewatchService = new RewatchService();
    }

    /**
     * calling mechanism => controller.uploadImage.bind(controller)
     * @param req
     * @param res
     * @param next
     */
    async uploadImage(req: Request, res: Response, next: NextFunction) {
        const path = `${req.query.path}`;
        if (path == '') return res.status(400).send({message: 'missing parameters!'});
        const response = await this.rewatchService.uploadVideo(path);

        return res.status(200).send({
            status: 200,
            message: 'success',
            path: path,
            data: !response ? 'something went wrong!' : response
        });
    }

    /**
     * calling mechanism => controller.anotherMethod
     * Alternate way to create above method
     * Purpose is to demonstrate this scope
     */
    anotherMethod = async (req: Request, res: Response, next: NextFunction) => {
        console.log(this);
        return res.status(200).send({status: 200, message: 'success'});
    }
}