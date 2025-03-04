import { describe, expect, test } from "vitest";
import PIPELINE_DATA from "../data/generated-pipeline.json";
import { recursion, recursionV2 } from "../solutions/recursion"
import { stack, stackV2 } from "../solutions/stack";


describe('recursion apprroach', () => {
    test('recursion', () => {
        const results = [];
        recursion(PIPELINE_DATA, results);
        expect(results.length).toEqual(50)
    })

    test('"optimized" recursionV2', () => {
        const results = [];
        recursionV2(PIPELINE_DATA, results);
        expect(results.length).toEqual(50)
    })
})

describe('stack apprroach', () => {
    test('stack', () => {
        const results = [];
        stack(PIPELINE_DATA, results);
        expect(results.length).toEqual(50)
    })

    test('"optimized" stackV2', () => {
        const results = [];
        stackV2(PIPELINE_DATA, results);
        expect(results.length).toEqual(50)
    })
})