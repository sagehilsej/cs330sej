const btn = document.querySelector(".btn");
const array = document.querySelector(".array");
const mean = document.querySelector(".mean");
const greater = document.querySelector(".greater");

btn.onclick = function () {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(Math.round(Math.random() * 100))
    }

    array.innerHTML = arr


    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    let avg = sum / arr.length
    mean.innerHTML = avg

    let great = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > avg) {
            great.push(arr[i])

        }
    }
    greater.innerHTML = great
}