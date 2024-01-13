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

export async function onRequestPost(ctx: Context): Promise<Response> {
    // READ HEADER PASSWORD!
    if (!authorize(ctx)) {
        return unauthorized();
    }
    
    // get data from args: file data and name.
    let formData = await ctx.request.formData();
    let fileName = formData.get("name");
    
    // check r2 for existing file with name.
    let check = await ctx.env.cranebotBucket.get(fileName) as R2ObjectBody;
    if (check !== null) {
        return objectExists(fileName);
    }
    
    // else, add file to bucket.
    let fileData = formData.get("data");
    const object = await ctx.env.cranebotBucket.put(fileName, fileData, {
        httpMetadata: ctx.request.headers,
    });

    return Response.json({status: 201, url: ctx.request.url.replace("upload", `view/${fileName}`)}, {status: 201});
}


export function onRequest(ctx: Context): Response {
    return Response.json({
        status: 405,
        message: `method ${ctx.request.method} not allowed.`
    }, {status: 405});
}
