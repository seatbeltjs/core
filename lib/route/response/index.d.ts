export declare namespace Response {
    interface Base {
        send: (status: number, body: Object) => any;
        ok: (body: Object) => any;
        created: (body: Object) => any;
        badRequest: (body: Object) => any;
        unauthorized: (body: Object) => any;
        forbidden: (body: Object) => any;
        notFound: (body: Object) => any;
        serverError: (body: Object) => any;
    }
}
