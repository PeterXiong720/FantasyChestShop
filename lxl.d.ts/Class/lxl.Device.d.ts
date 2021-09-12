declare class Device {
    get ip(): string;
    get avgPing(): number;
    get avgPacketLoss(): number;

    /**Device.os
     * 
     * Android	手机安卓Android
     * iOS	手机苹果iOS
     * OSX	电脑苹果OSX
     * Amazon	Amazon
     * GearVR	GearVR
     * Hololens	Hololens
     * Windows10	电脑Windows10
     * Win32	电脑Win32（教育版？）
     * TVOS	TVOS
     * PlayStation	主机PlayStation
     * Nintendo	主机Nintendo
     * Xbox	主机Xbox
     * WindowsPhone	手机Windows Phone
     * Unknown	未知系统
     */
    get os(): string;

    get clientId(): string;
}