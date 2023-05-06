import BaseProxyService from "../proxies/base.proxy.service";
import {Variables} from "graphql-request";

export default class RewatchProxy extends BaseProxyService implements ProxyInterface {

    /**
     * @param query
     * @param variables
     */
    public async request(query: string, variables: Variables): Promise<undefined | InitDirectVideoUpload> {
        try {
            const data: InitVideoUploadResponseInterface = await this.client.request(query, variables);
            const initiation_result: InitDirectVideoUpload = data.initiateDirectVideoUpload;

            // Check for any mutation errors, such as passing an invalid media type or filename.
            if (initiation_result.errors.length > 0) {
                const error_messages = initiation_result.errors.map((error: { message: string }) => error.message);
                console.error(`initiateDirectVideoUpload mutation failed: ${error_messages.join(", ")}`);
                return;
            }
            return initiation_result;
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * @param query
     * @param variables
     */
    public async post_request(query: string, variables: Variables): Promise<createVideoFromDirectUpload | undefined> {
        try {
            const data: PostVideoDirectUploadInterface = await this.client.request(query, variables);
            const result: createVideoFromDirectUpload = data.createVideoFromDirectUpload;
            console.log(result);
            if (result.errors.length > 0) {
                const error_messages = result.errors.map((error: { message: string }) => {
                    error.message
                });
                console.log(`createVideoFromDirectUpload mutation failed: ${error_messages.join(", ")}`);
                return;
            }

            return result;
        } catch (error) {
            console.log(error);
        }

    }
}