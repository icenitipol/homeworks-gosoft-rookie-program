const alphabetsArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

// const randomArrayIndex = (array) => Math.floor(Math.random() * array.length)

// const suffleArray = (array) => {
//     let temp = [...array];
//     let result = [];
//     for(let i = 0; i < array.length; i++) {
//         result = [...result, ...temp.splice(randomArrayIndex(temp), 1)];
//     }
//     return result;
// }

const suffleArray2 = (array) => {
    let result = [];
    for(let i = 0; i <= array.length; i++){
        const currentElement =  array[i + ((i % 2 == 0) ? (+1) : (-1))]
        if(currentElement) result.push(currentElement)
    }
    return result;
}

const printCharArray = (array) => {
    let result = "";
    for(let i = 0; i < array.length; i++) {
        result += array[i] + " "
    }
    console.log(result)
}

printCharArray(suffleArray2(alphabetsArray))