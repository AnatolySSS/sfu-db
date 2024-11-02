export const fillUniqueNumber = (arr, uniqueNumber) => {
    arr.map((obj, i) => {obj.uniqueNumber = `unique-${uniqueNumber + 1 + i}`});
    return arr;
}