let timer;
let isRunning = false;
let isPaused = false;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function updateDisplay() {
    var hours = Math.floor(elapsedTime / 3600);
    var minutes = Math.floor((elapsedTime % 3600) / 60);
    var seconds = elapsedTime % 60;
    display.textContent = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function pad(value) {
    return (value < 10 ? '0' : '') + value;
}

function startTimer() {
    if (isRunning && !isPaused) return;
    isRunning = true;
    isPaused = false;
    timer = setInterval(function() {
        elapsedTime++;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning || isPaused) return;
    isPaused = true;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    isPaused = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (!isRunning || isPaused) return;
    var hours = Math.floor(elapsedTime / 3600);
    var minutes = Math.floor((elapsedTime % 3600) / 60);
    var seconds = elapsedTime % 60;
    var lapTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    var lapItem = document.createElement('li');
    lapItem.textContent = 'Lap ' + lapCounter + ': ' + lapTime;
    lapList.appendChild(lapItem);
    lapCounter++;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
