declare class network {
    static httpGet(
        url: string,
        callback: (status: number, result: string) => void
    ): boolean;

    static httpPost(
        url: string,
        data: string,
        type: string,
        callback: (status: number, result: string) => void
    ): boolean;

    static newWebSocket(): WSClient;
}

declare class WSClient {
    get status(): wsc;

    connect(target: string): boolean;

    send(msg): boolean;

    listen(event: string, callback: (...arg: Array<any>) => void): boolean;

    close(): boolean;

    shutdown(): boolean;

    errorCode(): number;
}

declare enum wsc {
    Open,
    Closing,
    Closed
}