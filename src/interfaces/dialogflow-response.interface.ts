interface DialogflowResponseInterface {
    responseId: string,
    queryResult: QueryResult
}

interface QueryResult {
    fulfillmentMessages: [ [Object] ],
    outputContexts: [],
    queryText: string,
    action: string,
    parameters: {
        [key: string]: any
    },
    fulfillmentText: string,
    webhookSource: string,
    intent: {
        name: string,
        displayName: string,
        webhookState: string,
    },
}