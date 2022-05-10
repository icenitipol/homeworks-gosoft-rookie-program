export const allKeyExists = (obj: any, key: string[]) => {
    for (let i = 0; i < key.length; i++) {
        if (obj[key[i]] == null) return false;
    }
    return true;
}

export const anyKeyExists = (obj: any, key: string[]) => {
    for (let i = 0; i < key.length; i++) {
        if (obj[key[i]] != null) return true;
    }
    return false;
}

// const data: any = {
//     a: "test",
//     b: "",
//     c: 0
// }

// console.log("Testing 1: ", allKeyExists(data, ['a', 'b']))
// console.log("Testing 2: ", allKeyExists(data, ['a', 'b', 'c']))
// console.log("Testing 3: ", allKeyExists(data, ['a']))
// console.log("Testing 5: ", anyKeyExists(data, ['a', 'b']))
// console.log("Testing 6: ", anyKeyExists(data, ['c', 'd', 'e', 'f']))
// console.log("Testing 7: ", allKeyExists(data, ['c']))

// console.log(data["c"] ?? undefined)