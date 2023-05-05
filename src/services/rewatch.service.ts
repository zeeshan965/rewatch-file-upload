import {Request} from "express";
import BaseProxyService from "../proxies/base.proxy.service";
import {gql} from "graphql-request";
import fs from "fs";
const path = require('path');
import crypto from 'crypto';

export default class RewatchService extends BaseProxyService implements ProxyInterface {

    /**
     * @private
     */
    private prepareInitiateDirectVideoUploadQuery() {
        return gql`
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
            }`
    }

    private initiateDirectVideoUpload(file_path) {
        const fileData = fs.readFileSync(file_path);
        const file = {
            name: path.basename(file_path),
            size: fs.statSync(file_path).size,
            data: fileData,
            type: 'video/mp4'
        };
        this.prepareInitiateDirectVideoUploadQuery();
        const variables = {
            input: {
                byteSize: file.size,
                checksum: crypto.createHash('md5').update(file.data).digest('base64'),
                contentType: file.type,
                filename: file.name,
            },
        };
    }

    uploadVideo(req: Request) {
        const file_path = req.query.path;
        this.initiateDirectVideoUpload(file_path)
        console.log(req.query?.path)
        console.log(this.client)
        console.log(this.prepareInitiateDirectVideoUploadQuery())
    }
}