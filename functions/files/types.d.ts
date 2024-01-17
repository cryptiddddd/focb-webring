interface Env {
    cranebotBucket: R2Bucket;
    PASSKEY: string;
}

interface Params {
    filename: string;
}

interface Context {
    env: Env;
    params: Params;
    request: Request;
    next: () => Promise<void | Response>;
}


export type { Context };
