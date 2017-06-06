export declare type IPluginConfig = {
    pluginName: string;
    hook?: Function;
};
export declare function DRegisterPlugin(pluginConfig: IPluginConfig): Function;
