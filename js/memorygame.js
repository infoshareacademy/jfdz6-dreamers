var randomArray = [];
var randomCounter = 3;

function getRandomArray() {
    for (i = 0; i < randomCounter; i++) {
        randomArray.push(Math.floor((Math.random() * 4))+1)
    }
    return randomCounter + 1
}

getRandomArray();
console.log(randomArray);

function showWhatToRepeat() {
    for (i = 0; i < randomArraylength; i++) {
        if (randomArray[i] === 1) {

        }
    }
}
