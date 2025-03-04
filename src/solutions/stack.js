

const TARGET_KEY = 'image';


// Fist simple & durty stack solution
export function stack(pipelineData, result) {
    const stack = [pipelineData];

    while (stack.length > 0) {
        const last = stack.pop();
        if (Array.isArray(last)) {
            stack.push(...last);
            continue;
        }

        if (last instanceof Object && last.constructor === Object) {
            Object.keys(last).forEach(key => {
                if (key === TARGET_KEY) {
                    result.push(last[key]);
                }
                stack.push(last[key]);
            })
        }
    }
}


export function stackV2(pipelineData, result) {
    const stack = [pipelineData];

    while (stack.length > 0) {
        const last = stack.pop();
        if (last instanceof Array) {
            for (let i = 0; i < last.length; i++) {
                stack.push(last[i])
            }
            continue
        }

        if (typeof last === 'object' && last != null) {
            for (const key in last) {
                const value = last[key]
                if (key === TARGET_KEY) {
                    result.push(value);
                }
                stack.push(value);
            }
        }
    }
}