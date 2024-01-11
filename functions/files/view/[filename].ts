// for viewing files in the bucket.
// ex: /files/view/lala.jpg


export function onRequestGet({ request }): Response {
    // actually response type will be whatever file type the requested item is.
    return Response.json({file: "here it is!"});
}
