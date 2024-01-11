// endpoint for file deletion.
// requires password header.


export function onRequestDelete({ request }): Response {

    return Response.json({ok: "deleted!"});
}
