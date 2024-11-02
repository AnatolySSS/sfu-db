export const fillSodfuNumber = (arr) => {
    console.log(arr);
    arr.map((obj) => {
        if (obj.sodfuNumber == null) {
            obj.sodfuNumber = "№ не определен"
        }
    })
    return arr;
}