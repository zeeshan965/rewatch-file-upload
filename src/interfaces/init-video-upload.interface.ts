interface InitVideoUploadResponseInterface {
    initiateDirectVideoUpload: InitDirectVideoUpload
}

interface InitDirectVideoUpload {
    uploadHeaders: string
    uploadId: string
    uploadUrl: string
    errors: []
}