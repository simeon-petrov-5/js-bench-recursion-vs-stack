import { run, bench, boxplot, summary } from 'mitata';
import { recursion, recursionV2 } from './solutions/recursion.js';
import pipelineData from './data/generated-pipeline.json' with { type: "json" };
import { stack, stackV2 } from './solutions/stack.js';

function testRecursion(data) {
    const res = [];
    recursion(data, res);
    return res;
}

function testRecursionV2(data) {
    const res = [];
    recursionV2(data, res);
    return res;
}

function testStack(data) {
    const res = [];
    stack(data, res);
    return res;
}

function testStackV2(data) {
    const res = [];
    stackV2(data, res);
    return res;
}

// // Warm-up phase
// console.log("Warming up...");
// for (let i = 0; i < 5; i++) {
//     testRecursion(pipelineData);
//     testRecursionV2(pipelineData);
//     testStack(pipelineData);
//     testStackV2(pipelineData);
// }
// console.log("Starting benchmark numerro duo...");


// Benchmarking
summary(() => {
    bench('Recursion', () => testRecursion(pipelineData)).gc('inner');
    bench('RecursionV2', () => testRecursionV2(pipelineData)).gc('inner');
    bench('Stack', () => testStack(pipelineData)).gc('inner');
    bench('StackV2', () => testStackV2(pipelineData)).gc('inner');
})

// const markdownContent = await run({format:'markdown'});

// saveMdFile(markdownContent.context, 'performance.md', './performance');

await run();