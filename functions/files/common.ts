import html from "../../src/404.html"; // don't worry about it, funny cloudflare thing i can do.
import type { Context } from "./types";


function page404(): Response {
    // return the 404 page!
    return new Response(
		html,
        {headers: { "Content-Type": "text/html" }}
	);
}


function unauthorized(): Response {
  return Response.json({status: 401, message: "unauthorized."}, {status: 401});
}


/**
 * checks that the request has the desired passkey.
 * @param request http request
 * @param passkey passkey from secrets kv namespace
 * @returns true if authroized, false if not.
 */
function authorize(ctx: Context): boolean {
  let headers = ctx.request.headers;
  return !(!headers.has("Authorization") || headers.get("Authorization") !== ctx.env.PASSKEY);
}


export { page404, authorize, unauthorized };
