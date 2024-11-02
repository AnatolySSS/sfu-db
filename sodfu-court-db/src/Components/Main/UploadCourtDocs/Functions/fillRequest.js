export const fillRequest = (arr) => {
    arr.map((obj) => {
        if (obj.docType.toLowerCase().includes('запрос')) {
            obj.hasRequest = true
        } else {
            obj.hasRequest = false
        }
    })
    return arr;
}