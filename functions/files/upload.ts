// endpoint for upload POST requests.
// password required.


export function onRequestPost({ request }): Response {


    return Response.json({yeah: "uploaded!"});
}