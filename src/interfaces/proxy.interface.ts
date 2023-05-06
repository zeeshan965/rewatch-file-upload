interface ProxyInterface {
    /**
     * @param result
     * @param fileData
     */
    put(result: InitDirectVideoUpload, fileData: Buffer): Promise<string | undefined>;
}
