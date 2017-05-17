export declare type IPolicyConstructor = new () => {
    controller: Function;
};
export declare function DPolicy(policyNames?: string | string[]): Function;
