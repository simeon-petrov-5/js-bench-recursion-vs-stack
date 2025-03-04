
const TARGET_KEY = 'image';

// Initial quick & durty solution
export const recursion = (pipelineData, results) => {
    Object.keys(pipelineData).forEach(key => {
        const value = pipelineData[key];
        if (key === TARGET_KEY) {
            results.push(value);
            return;
        }

        if (typeof value !== 'object') {
            return;
        }

        if (Array.isArray(value)) {
            value.forEach(subItem => recursion(subItem, results))
        }

        if (value instanceof Object && value.constructor === Object) {
            recursion(value, results)
        }

    })
}


/**
 * "Optimized" version
 * for i++ loop
 * for ... in instead of Object.keys().forEach()
 * instanceof Array instead Array.isArray
 */
export const recursionV2 = (pipelineData, results) => {
    for (const key in pipelineData) {
        const value = pipelineData[key];
        if (key === TARGET_KEY) {
            results.push(value);
            continue;
        }

        if (typeof value !== 'object' || value === null) {
            continue;
        }

        if (value instanceof Array) {
            for (let i = 0; i < value.length; i++) {
                recursionV2(value[i], results);
            }
        } else {
            recursionV2(value, results);
        }
    }
};