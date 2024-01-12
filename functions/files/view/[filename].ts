// for viewing files in the bucket.
// ex: /files/view/lala.jpg

// gameplan: start here with serving files from the bucket.
import type { Context } from "../types";

import html from "../../../src/404.html"; // don't worry about it, funny cloudflare thing i can do.


function notFound(): Response {
    // return the 404 page!
    return new Response(
		html,
        {headers: { "Content-Type": "text/html" }}
	);

}
  
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
        return notFound();
      }

      // headers
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);

      // if object has range.
      if (object.range) {
        headers.set("content-range", `bytes ${object.range.offset}-${object.range.end ?? object.size - 1}/${object.size}`)
      }
      
      // decide status.
      const status = object.body ? (ctx.request.headers.get("range") !== null ? 206 : 200) : 304

      // return response.
      return new Response(object.body, {
        headers,
        status
      })
}
