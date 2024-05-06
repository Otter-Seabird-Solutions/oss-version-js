import { describe, it, expect } from "@jest/globals";
import data from "./data.json";
import { Version } from "../dist/src/index";

describe("The parser", function () {
    for (let i = 0; i < data.version.length; i++) {
        if (data.valid[i]) {
            it(`should work with ${data.version[i]}`, function () {
                expect(Version.parse(data.version[i])).toMatchObject({
                    major: data.major[i],
                    minor: data.minor[i],
                    patch: data.patch[i],
                    preRelease: data.preRelease[i] ?? undefined,
                    buildMetadata: data.buildMetadata[i] ?? undefined,
                });
            });
        } else {
            it(`should not work with ${data.version[i]}`, function () {
                expect(Version.parse.bind(this, data.version[i])).toThrowError("not Semantic Version compliant");
            });
        }
    }
});
