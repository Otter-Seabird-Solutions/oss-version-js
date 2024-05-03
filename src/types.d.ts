declare module "oss-version-js" {
    export interface VersionOptions {
        minMajor: number;
        maxMajor: number;
        minMinor: number;
        maxMinor: number;
        minPatch: number;
        maxPatch: number;
        type: "short" | "long";
        defaultType: string;
    }
}
