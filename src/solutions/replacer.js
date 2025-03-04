const TARGET_KEY = 'image';

export function jsonReplacer(data, result) {
    JSON.stringify(data, (key, value) => {
        if (key === TARGET_KEY) {
            result.push(value)
        }
        return value
    })
}