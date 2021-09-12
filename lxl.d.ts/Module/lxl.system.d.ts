declare class system {
    static cmd(
        cmd: string,
        callback: (exitcode: number, output) => void,
        timeLimit?: number
    ): boolean;

    static newProcess(
        process: string,
        callback: (exitcode: number, output) => void,
        timeLimit?: number
    ): boolean;

    static getTimeStr(): string;

    static getTimeObj(): {
        Y: number,
        M: number,
        D: number,
        h: number,
        m: number,
        s: number,
        ms: number
    };

    static randomGuid(): string;
}