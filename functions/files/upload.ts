// endpoint for upload POST requests.
// password required.
import type { Context } from "./types";

import { authorize, unauthorized } from "./common";


function objectExists(fileName: string) {
    return Response.json({
       status: 409,
       message: `file '${fileName}' already exists, cannot upload.` 
    }, {status: 409});
}

function missingArgument(field: string) {
    return Response.json({
        status: 400,
        message: `missing argument for '${field}'`
    }, {status: 400})
}


/**
 * handles POST requests. anticipates creation and completion of mpu.
 * @param ctx request's context, including the request, the cf pages platform, and env vars.
 * @returns json response.
 */
export async function onRequestPost(ctx: Context): Promise<Response> {
    // authorize.
    if (!authorize(ctx)) {
        return unauthorized();
    }
    
    // get data from args: file data and name.
    let params = new URLSearchParams(ctx.request.url.split("?")[1]);
    let fileName = params.get("name");
    let action = params.get("action");

    // context-dependent params
    let contentType = params.get("type");
    let uploadID = params.get("uploadID");
    
    
    // case switch between mpu-create and mpu-complete
    switch (action) {
        case "mpu-create": {
            // check r2 for existing file with name.
            if (await ctx.env.cranebotBucket.get(fileName) !== null) {
                return objectExists(fileName);
            }
            
            // handle missing arguments.
            if (fileName === null) return missingArgument("name");
            else if (contentType === null) return missingArgument("type");

            // create upload.
            let upload = await ctx.env.cranebotBucket.createMultipartUpload(fileName, {httpMetadata: {contentType: contentType}});
            
            // return data
            let data = {uploadID: upload.uploadId, key: upload.key};
            return Response.json({status: 201, message: "success, mpu created", data: data}, {status: 201})
        }
        
        case "mpu-complete": {
            // get id
            if (uploadID === null) return missingArgument("uploadID");
            
            // get body
            const completeBody: any = await ctx.request.json();
            if (completeBody === null) {
                return Response.json({status: 400, message: "missing or incomplete body content."}, {status: 400});
            }
            
            // get upload.
            let upload = await ctx.env.cranebotBucket.resumeMultipartUpload(fileName, uploadID);
            
            // prepare for errors.
            try {
                // complete and return. 
                const object = await upload.complete(completeBody.parts);

                let url = new URL(ctx.request.url);

                return Response.json({
                    status: 201, 
                    url: url.origin + url.pathname.replace("upload", `view/${object.key}`)
                }, {status: 201});
            } catch (error: any) {
                // generic error handling.
                return Response.json({status: 400, message: error.message}, { status: 400 });
            }
        }
        
        default:
            // default error message.
            return missingArgument("action");
    }    
}


/**
 * handles PUT requests. expects part upload.
 * @param ctx context
 * @returns json response
 */
export async function onRequestPut(ctx: Context): Promise<Response> {
    // authorize.
    if (!authorize(ctx)) {
        return unauthorized();
    }

    // get data from args: file data and name.
    let params = new URLSearchParams(ctx.request.url.split("?")[1]);
    let action = params.get("action");

    // context dependent necessity.
    let fileName = params.get("name");
    let uploadID = params.get("uploadID");
    let partNumber = parseInt(params.get("partNumber"));
    
    switch (action) {
        // check action for mpu-partupload
        case "mpu-uploadpart": {
            // handle missing fields
            if (uploadID === null) return missingArgument("uploadID");
            else if (fileName === null) return missingArgument("name");
            else if (partNumber === null) return missingArgument("partNumber");

            // handle missing body
            if (ctx.request.body === null) return Response.json({status: 400, message: "missing request body"}, {status: 400});

            // resume upload
            let upload = ctx.env.cranebotBucket.resumeMultipartUpload(fileName, uploadID);

            // prepare for errors
            try {
                let uploadedPart = await upload.uploadPart(partNumber, ctx.request.body);

                // return part's json.
                return Response.json(uploadedPart);
            } catch (error: any) {
                return Response.json({status: 400, message: error.message}, { status: 400 });
            }
        }
        
        // error message for missing action.
        default: 
            return missingArgument("action");
    }
}


// handles other request method attempts.
export function onRequest(ctx: Context): Response {
    return Response.json({
        status: 405,
        message: `method ${ctx.request.method} not allowed.`
    }, {status: 405});
}
