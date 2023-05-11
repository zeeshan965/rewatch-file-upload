import {NextFunction, Request, Response} from "express";
import RewatchService from "../services/rewatch.service";
import twilio from 'twilio';
import dialogflow from '@google-cloud/dialogflow';
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import {google} from "@google-cloud/dialogflow/build/protos/protos";
import DetectIntentResponse = google.cloud.dialogflow.v2.DetectIntentResponse;

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

    /**
     * @param req
     * @param res
     * @param next
     */
    primary = async (req: Request, res: Response, next: NextFunction) => {
        console.log('primary');
        const twiml = new twilio.twiml.VoiceResponse();
        // twiml.gather();

        try {
            const dialogflowResponse = await this.sendToDialogflow("explain what are you ?");
            if (typeof dialogflowResponse !== 'undefined') {
                const agentResponse = (dialogflowResponse as DialogflowResponseInterface).queryResult.fulfillmentText;
                twiml.say(agentResponse);
            }
        } catch (error) {
            console.error('Error during Dialogflow communication:', error);
            twiml.say('An error occurred. Please try again later. Sadiii jannn chado');

        }
        res.type('text/xml');
        res.send(twiml.toString());
        console.log('------------------------------------END primary-----------------------------------------')
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    secondary = async (req: Request, res: Response, next: NextFunction) => {
        console.log('secondary');
        console.log(req.body)
        console.log(req.headers)
        console.log('---------------------------------------------END secondary--------------------------------------------')
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    status = async (req: Request, res: Response, next: NextFunction) => {
        console.log('status change call');
        console.log(req.body)
        console.log(req.headers)
        console.log('------------------------------------END status-----------------------------------------')
    }

    /**
     * @param userInput
     */
    private sendToDialogflow = (userInput: string) => {
        return new Promise((resolve, reject) => {
            const sessionId = 'ACeee2494ee500f92153eacec3e5ba3a56';
            const projectId = 'real-time-video-chat-19bde';
            const languageCode = 'en-US';

            const sessionClient = new dialogflow.SessionsClient();
            const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: userInput,
                        languageCode: languageCode,
                    },
                },
            };
            console.log(request)
            sessionClient.detectIntent(request).then(responses => {
                resolve(responses[0]);
            }).catch(err => {
                reject(err);
            });
        });
    }
}