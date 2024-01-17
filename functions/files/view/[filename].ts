// for viewing files in the bucket.
// ex: /files/view/lala.jpg

import type { Context } from "../types";
    

/**
 * base taken from https://developers.cloudflare.com/r2/examples/demo-worker/
 * @param ctx 
 * @returns 
 */
export async function onRequestGet(ctx: Context): Promise<Response> {
    // organize variables
    let objectName = ctx.params.filename;

    // attempt to get object.
    const object = await ctx.env.cranebotBucket.get(objectName, {
            range: ctx.request.headers,
            onlyIf: ctx.request.headers,
        }) as R2ObjectBody;

    // if null, return error
    if (object === null) {
        return await ctx.next() as Response;
    }

    // headers
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);

    // if object has range.
    if (object.range) {
        headers.set("content-range", `bytes ${(object.range as any).offset}-${(object.range as any).end ?? object.size - 1}/${object.size}`);
    }
    
    // decide status.
    const status = object.body ? (ctx.request.headers.get("range") !== null ? 206 : 200) : 304;

    // return response.
    return new Response(object.body, {
        headers,
        status
    })
}
