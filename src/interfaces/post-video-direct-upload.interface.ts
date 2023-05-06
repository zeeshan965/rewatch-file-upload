interface PostVideoDirectUploadInterface {
    createVideoFromDirectUpload: createVideoFromDirectUpload
}

interface createVideoFromDirectUpload {
    video: {
        title: string;
        url: string;
    }
    errors: []
}