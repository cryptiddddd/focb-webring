import type { Context } from "./types";



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


export { authorize, unauthorized };
