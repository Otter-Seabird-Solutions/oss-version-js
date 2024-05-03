import assert from "assert";
import { describe } from "mocha";
import { Version } from "../dist/src/index.js";

describe("Version", function () {
    describe("parsing", function () {
        it("should return an object with default params and major version 1 when the version is 1", function () {
            const parsed = Version.parse("1");
            /** @type {ReturnType<Version.parse>} */
            const expectedResults = {
                major: 1,
                minor: Version.DEFAULT_OPTIONS.minMinor,
                patch: Version.DEFAULT_OPTIONS.minPatch,
                type: Version.DEFAULT_OPTIONS.defaultType,
            };
            assert.equal(parsed, expectedResults);
        });
    });
});
