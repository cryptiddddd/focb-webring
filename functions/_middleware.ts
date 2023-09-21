// this adds the cors response headers. this is async, and i do not yet 100% understand that.
// this must be used instead of _headers though.

export const onRequest: PagesFunction = async ({ next }) => {
    const response = await next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Max-Age', '86400');
    return response;
};
  