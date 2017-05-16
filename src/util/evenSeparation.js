/**
 * Returns a list of offsets to evenly separate elements on a straight line
 * @param {number} n - number of elements to separate
 * @param {number} size - size of one element
 * @param {number} length - length of the line
 * @return {Array<number>}
 */
export default function evenSeparation(n, size, length) {
    if (n === 0) return [];

    const totalHeight = size * n;
    const step = (length - totalHeight) / (n + 1);

    const result = [];
    let currentStep = step;
    for (let i = 0; i < n; i++) {
        result.push(currentStep);
        currentStep += step + size;
    }
    return result;
}
