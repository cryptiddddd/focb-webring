// endpoint for file deletion.
// requires password header.
import type { Context } from "./types";

import { authorize, unauthorized } from "./common";

function objectNotFound(fileName: string): Response {
    return Response.json({status: 404, message: `object '${fileName}' does not exist.`}, {status: 404});
}


export async function onRequestDelete(ctx: Context): Promise<Response> {
    // READ HEADER PASSWORD!
    if (!authorize(ctx)) {
        return unauthorized();
    }

    // get name of file to delete.
    let params = new URLSearchParams(ctx.request.url.split("?")[1]);
    let fileName = params.get("name");

    // check that it exists.
    let check = await ctx.env.cranebotBucket.get(fileName) as R2ObjectBody;
    if (check === null) {
        return objectNotFound(fileName);
    }

    // delete it and send validating feedback.
    await ctx.env.cranebotBucket.delete(fileName);
    return Response.json({status: 204, message: `'${fileName}' has been deleted.`}, {status: 204});
}


export function onRequest(ctx: Context): Response {
    return Response.json({
        status: 405,
        message: `method ${ctx.request.method} not allowed.`
    },
    {status: 405});
}
