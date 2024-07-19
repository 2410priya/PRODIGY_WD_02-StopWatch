let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        toggleButtons(true);
    }
}

function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        toggleButtons(false);
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    laps = [];
    lapsList.innerHTML = '';
    toggleButtons(false);
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        laps.push(lapTime);
        const li = document.createElement('li');
        li.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsList.prepend(li); // Display latest lap at the top
    }
}

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = padTime(date.getMinutes());
    const seconds = padTime(date.getSeconds());
    const centiseconds = padTime(Math.floor(date.getMilliseconds() / 10));
    return `${minutes}:${seconds}.${centiseconds}`;
}

function padTime(value) {
    return value < 10 ? `0${value}` : value;
}

function toggleButtons(running) {
    startButton.disabled = running;
    stopButton.disabled = !running;
    lapButton.disabled = !running;
}
