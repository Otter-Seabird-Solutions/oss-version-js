import type { VersionOptions } from "oss-version-js";

export class Version {
    private input: string;
    private options: VersionOptions;
    private major: number;
    private minor: number;
    private patch: number;
    private type: string;

    static DEFAULT_OPTIONS: VersionOptions = {
        minMajor: 0,
        maxMajor: 10,
        minMinor: 0,
        maxMinor: 10,
        minPatch: 0,
        maxPatch: 10,
        type: "short",
        defaultType: "release",
    };

    constructor(input: string, options: Partial<VersionOptions> = {}) {
        this.input = input;
        this.options = {
            ...Version.DEFAULT_OPTIONS,
            ...options,
        };

        let tmp = Version.parse(input, options);
        this.major = tmp.major;
        this.minor = tmp.minor;
        this.patch = tmp.patch;
        this.type = tmp.type;
    }
    toString(showType = true) {
        let ver = `${this.major}.${this.minor}.${this.patch}`;
        if (showType) {
            ver += `-${this.options.type === "short" ? this.type.at(0) : this.type}`;
        }
        return ver;
    }
    static parse(input: string, options: Partial<VersionOptions> = {}) {
        let opt = {
            ...Version.DEFAULT_OPTIONS,
            ...options,
        };

        let tmp = input.split("-");
        let nums = tmp[0]?.split(".") ?? [];
        return {
            major: Number(nums[0]) ?? opt.minMajor,
            minor: Number(nums[1]) ?? opt.minMinor,
            patch: Number(nums[2]) ?? opt.minPatch,
            type: tmp[1] ?? opt.defaultType,
        };
    }
}
