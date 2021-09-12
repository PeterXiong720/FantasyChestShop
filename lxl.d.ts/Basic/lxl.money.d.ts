declare class money {
    static set(xuid: string, money: number): boolean;

    static get(xuid: string): number;

    static add(xuid: string, money: number): boolean;

    static reduce(xuid: string, money: number): boolean;

    static trans(
        xuid_form: string,
        xuid_to: string,
        money: number,
        note?: string
    ): boolean;

    static getHistory(xuid: string, time: number): Array<{
        from: string,
        to: string,
        money: number,
        time: string,
        note: string
    }>;

    static clearHistory(time: number);
}