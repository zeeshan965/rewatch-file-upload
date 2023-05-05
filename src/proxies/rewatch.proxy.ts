import {Request} from "express";
import BaseProxyService from "../proxies/base.proxy.service";

export default class RewatchProxyService extends BaseProxyService implements ProxyInterface {

    private prepareInitiateDirectVideoUploadQuery() {
        const INITIATE_UPLOAD_MUTATION = `
            mutation ($input: InitiateDirectVideoUploadInput!) {
                initiateDirectVideoUpload(input: $input) {
                    uploadHeaders
                    uploadId
                    uploadUrl
                    errors {
                        message
                        path
                    }
                }
            }
        `;
        return INITIATE_UPLOAD_MUTATION
    }

    private initiateDirectVideoUpload() {

    }

    uploadVideo(req: Request) {
        console.log(req.query?.path)
        console.log(this.client)


    }
}