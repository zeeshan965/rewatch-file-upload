import {gql, Variables} from "graphql-request";
import fs from "fs";
import crypto from 'crypto';
import RewatchProxy from "../proxies/rewatch.proxy";

const path = require('path');

export default class RewatchService {

    /** @private rewatchProxy: RewatchProxy */
    private rewatchProxy: RewatchProxy;

    constructor() {
        this.rewatchProxy = new RewatchProxy()
    }

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

    /**
     * @private
     */
    private preparePostVideoFromDirectUploadQuery() {
        return gql`
            mutation($input: CreateVideoFromDirectUploadInput!) {
                createVideoFromDirectUpload(input: $input) {
                    video {
                        title
                        url
                    }
                    errors {
                        message
                        path
                    }
                }
            }
        `
    }

    /**
     * @param file_path
     * @param fileData
     * @private
     */
    private prepareVariables(file_path: string, fileData: Buffer): Variables {
        return {
            input: {
                byteSize: fs.statSync(file_path).size,
                checksum: crypto.createHash('md5').update(fileData).digest('base64'),
                contentType: 'video/mp4',
                filename: path.basename(file_path),
            },
        };
    }

    /**
     * @param uploadId
     * @private
     */
    private preparePostVariables(uploadId: string): Variables {
        return {
            input: {
                uploadId: uploadId,
                title: "My Video ",
                description: "My super neat video.",
                visibility: "ON_CHANNEL",
            },
        };
    }

    /**
     * @param file_path
     */
    public async uploadVideo(file_path: string) {
        const fileData = fs.readFileSync(file_path);
        const init_query: string = this.prepareInitiateDirectVideoUploadQuery();
        const init_variables: Variables = this.prepareVariables(file_path, fileData);
        const result: InitDirectVideoUpload | undefined = await this.rewatchProxy.request(init_query, init_variables);
        if (!result) return;

        const url = await this.rewatchProxy.put(result, fileData);
        if (!url) return;

        const post_query: string = this.preparePostVideoFromDirectUploadQuery();
        const post_variables: Variables = this.preparePostVariables(result.uploadId);
        return await this.rewatchProxy.post_request(post_query, post_variables);
    }
}