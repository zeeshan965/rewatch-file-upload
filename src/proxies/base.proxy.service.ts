import config from "config";
import {GraphQLClient} from 'graphql-request';

export default class BaseProxyService implements ProxyInterface {
    protected client: GraphQLClient;

    constructor() {
        this.client = this.getClient();
    }

    parseMessage(response: object[]): object[] {
        return [];
    }

    put(): void {

    }

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