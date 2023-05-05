interface ProxyInterface {
    put(): void;

    parseMessage(response: object[]): object[];
}
