export const getValues = (valuesArr, valuesFromDb) => {
    let valuesObj = {}
    valuesArr.map(item => {
        valuesObj[item] = [... new Set(valuesFromDb.map(value => value[item]).filter(v => v !== null))]
    })
    return valuesObj;
}