import type { VersionOptions } from "oss-version-js";

/**
 * Regex101 page: {@link https://regex101.com/r/vkijKf/1/}
 */
const SemanticVersionRegexp =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

export class Version {
    private options: VersionOptions;
    private major: number;
    private minor: number;
    private patch: number;
    private preRelease: string | undefined;
    private buildMetadata: string | undefined;

    static DEFAULT_OPTIONS: VersionOptions = {
        showBuildmeta: false,
        showPreRelease: true,
    };

    constructor(input: string, options: Partial<VersionOptions> = {}) {
        this.options = {
            ...Version.DEFAULT_OPTIONS,
            ...options,
        };

        let tmp = Version.parse(input);
        this.major = tmp.major;
        this.minor = tmp.minor;
        this.patch = tmp.patch;
        this.preRelease = tmp.preRelease;
        this.buildMetadata = tmp.buildMetadata;
    }
    incrementMajor(by = 1) {
        by = Math.round(by);

        if (by <= 0) {
            throw new Error(`Can't increase by ${by}. ${by} must be superior to 0`);
        }
        this.major += by;
        return this;
    }
    decrementMajor(by = 1) {
        by = Math.round(by);
        if (by <= 0) {
            throw new Error(`Can't decrease by ${by}. ${by} must be superior to 0`);
        }
        if (this.major - by < 0) {
            throw new Error(`Can't decrease by ${by} major version (would be negative)`);
        }

        this.major -= by;
        return this;
    }
    setMajor(at: number) {
        if (at < 0) {
            throw new Error(`Can't set major version at ${at}. ${at} must be superior or equal to 0`);
        }
    }

    incrementMinor(by = 1) {
        by = Math.round(by);

        if (by <= 0) {
            throw new Error(`Can't increase by ${by}. ${by} must be superior to 0`);
        }
        this.minor += by;
        return this;
    }
    decrementMinor(by = 1) {
        by = Math.round(by);
        if (by <= 0) {
            throw new Error(`Can't decrease by ${by}. ${by} must be superior to 0`);
        }
        if (this.minor - by < 0) {
            throw new Error(`Can't decrease by ${by} minor version (would be negative)`);
        }

        this.minor -= by;
        return this;
    }

    incrementPatch(by = 1) {
        by = Math.round(by);

        if (by <= 0) {
            throw new Error(`Can't increase by ${by}. ${by} must be superior to 0`);
        }
        this.patch += by;
        return this;
    }
    decrementPatch(by = 1) {
        by = Math.round(by);
        if (by <= 0) {
            throw new Error(`Can't decrease by ${by}. ${by} must be superior to 0`);
        }
        if (this.patch - by < 0) {
            throw new Error(`Can't decrease by ${by} patch version (would be negative)`);
        }

        this.patch -= by;
        return this;
    }

    getObject() {
        return {
            major: this.major,
            minor: this.minor,
            patch: this.patch,
            preRelease: this.preRelease,
            buildMetadata: this.buildMetadata,
        };
    }
    toString(options: Partial<VersionOptions> = {}) {
        const opt = {
            ...Version.DEFAULT_OPTIONS,
            ...this.options,
            ...options,
        };

        let ver = `${this.major}.${this.minor}.${this.patch}`;
        if (opt.showPreRelease && this.preRelease) {
            ver += `-${this.preRelease}`;
        }
        if (opt.showBuildmeta && this.buildMetadata) {
            ver += `+${this.buildMetadata}`;
        }
        return ver;
    }
    static parse(input: string) {
        const match = input.match(SemanticVersionRegexp);

        if (match) {
            return {
                major: Number(match[1]),
                minor: Number(match[2]),
                patch: Number(match[3]),
                preRelease: match[4],
                buildMetadata: match[5],
            };
        } else {
            throw new Error(`${input} is not Semantic Version compliant. See more here: https://semver.org/`);
        }
    }
}
