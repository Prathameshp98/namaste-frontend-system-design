


const sumOfElements = (arr) => {

    let sum = 0;
    for(let num of arr){
        sum += num;
    }
    return sum;
}

module.exports = { sumOfElements };
