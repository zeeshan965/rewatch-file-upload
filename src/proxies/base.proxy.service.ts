import config from "config";
import {GraphQLClient} from 'graphql-request';

export default class BaseProxyService implements ProxyInterface {
    protected client: GraphQLClient;

    constructor() {
        this.client = this.getClient();
    }

    /**
     * @param data
     * @param fileData
     */
    public async put(data: InitDirectVideoUpload, fileData: Buffer): Promise<string | undefined> {
        const uploadRequest = {
            method: 'PUT',
            headers: JSON.parse(data.uploadHeaders),
            body: fileData,
        };
        try {
            const response: Response = await fetch(data.uploadUrl, uploadRequest);
            if (response.status !== 200) return;
            console.log(response.status)
            return response.url;
        } catch (error) {
            console.log(error)
        }
    }

    /**
     *
     */
    getClient() {
        const token = config.get('rewatch_token') as number;
        const uri = config.get('rewatch_uri') as string;

        return new GraphQLClient(uri, {
            headers: {
                Authorization: `Token token=${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

}