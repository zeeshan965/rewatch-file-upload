import express, {NextFunction, Request, Response} from "express";
const api = require("./routes/index");

import fs from 'fs';
import crypto from 'crypto';

// const {GraphQLClient, gql} = require('graphql-request');
const path = require('path');
const app = express();


/*
const INITIATE_UPLOAD_MUTATION = `
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
    }
`;*/
// const fileData = fs.readFileSync(file_path);
// const file = {
//     name: path.basename(file_path),
//     size: fs.statSync(file_path).size,
//     data: fileData,
//     type: 'video/mp4'
// };

//console.log(file);

/*const variables = {
    input: {
        byteSize: file.size,
        checksum: crypto.createHash('md5').update(file.data).digest('base64'),
        contentType: file.type,
        filename: file.name,
    },
};*/

//console.log(variables);

/*interface queryResponse {
    initiateDirectVideoUpload: {
        uploadHeaders: string
        uploadId: string
        uploadUrl: string
        errors: []
    }
}*/

/*interface videoDirectUpload {
    createVideoFromDirectUpload:{
        video: {
            title: string;
            url: string;
        }
        errors: []
    }
}*/

/*client.request(INITIATE_UPLOAD_MUTATION, variables).then((data: queryResponse) => {
    const initiation_result = data.initiateDirectVideoUpload;
    //console.log(initiation_result)

    // Check for any mutation errors, such as passing an invalid media type or filename.
    if (initiation_result.errors.length > 0) {
        const error_messages = initiation_result.errors.map((error: { message: string }) => error.message);
        console.error(`initiateDirectVideoUpload mutation failed: ${error_messages.join(", ")}`);
        return;
    }

    const uploadUrl = initiation_result.uploadUrl;
    const uploadHeaders = JSON.parse(initiation_result.uploadHeaders);
    const fileData = fs.readFileSync(file_path);
    const uploadRequest = {
        method: 'PUT',
        headers: uploadHeaders,
        body: fileData,
    };

    console.log(uploadUrl)
    console.log(uploadRequest)
    fetch(uploadUrl, uploadRequest).then(async (response) => {
        //console.log(response)
        if (200 === response.status) {
            console.log('File uploaded successfully');
            console.log(response.url)
            // console.log(response.status)
            // console.log(response.statusText)
            // console.log(response.headers)
            const CREATE_VIDEO_MUTATION = `
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
            `;
            console.log(CREATE_VIDEO_MUTATION);
            const query_response = await client.request(CREATE_VIDEO_MUTATION, {
                input: {
                    uploadId: initiation_result.uploadId,
                    title: "My Video ",
                    description: "My super neat video.",
                    visibility: "ON_CHANNEL",
                },
            });

            console.log(query_response);
            if (query_response.errors) {
                const error_messages = query_response.errors.map((error: { message: string }) => {
                    error.message
                });
                console.log(`createVideoFromDirectUpload mutation failed: ${error_messages.join(", ")}`);
                return;
            }

            //const create_video_result = query_response.data.create_video_from_direct_upload;

        }


    }).catch((error) => {
        console.error(error);
    });


}).catch((error: any) => {
    console.error(`initiateDirectVideoUpload mutation failed: ${error.message}`);
});*/


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World!')
})

app.use('/api', api);

module.exports = app;
