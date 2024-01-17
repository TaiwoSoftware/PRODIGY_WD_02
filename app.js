const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const start = document.querySelector('#start');
const mainTime = document.querySelector('#mainTime');
let lapTimes = [];
let isPaused = false;

// Handling the slicing
const sliceTwo = (e)=> {
    let  inputValue  = e.target.value;
    e.target.value =inputValue.slice(0,2)
}

hours.addEventListener('input',(e) => {
    let  inputValue  = e.target.value;
    e.target.value =inputValue.slice(0,2);

});
minutes.addEventListener('input', sliceTwo);
seconds.addEventListener('input', sliceTwo);

let timer;
let totalSeconds;
let remainingSeconds;

const startTimer =() => {

    if (isPaused) {
        isPaused = false;
        resumeTimer();
        return;
    }
    mainTime.classList.add('remove')
    const hours = parseInt(document.querySelector('#hours').value, 10) || 0;
    const minutes = parseInt(document.querySelector('#minutes').value, 10) || 0;
    const seconds = parseInt(document.querySelector('#seconds').value, 10) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    remainingSeconds = totalSeconds;

    updateDisplay();
    timer = setInterval(updateDisplay, 100);
}

const updateDisplay = () => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    document.getElementById('timerDisplay').innerText = formattedTime;

    if (remainingSeconds <= 0) {
        clearInterval(timer);
        alert("Timer finished!");
    } else {
        remainingSeconds--;
    }
};

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

//Reset timer
const resetTimer = () => {
    mainTime.classList.remove('remove')
    clearInterval(timer)
    document.getElementById('hours').value = 0;
    document.getElementById('minutes').value = 0;
    document.getElementById('seconds').value = 0;
    document.getElementById('timerDisplay').innerText = '00:00:00';

    lapTimes = [];
    updateLaps();
}

//Handling lap 

function lap() {
    const lapTime = totalSeconds - remainingSeconds;
    const lapObject = convertSecondsToTime(lapTime);
    lapTimes.push(lapObject);
    updateLaps();
}

function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
        hours: formatTime(hours),
        minutes: formatTime(minutes),
        seconds: formatTime(remainingSeconds)
    };
}
function updateLaps() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';

    lapTimes.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.innerText = `${lap.hours}:${lap.minutes}:${lap.seconds}`;
        lapList.appendChild(lapItem);
    });
}

// Pause the timer
const pauseTimer = () => {
    clearInterval(timer);
    isPaused = true;
}

function resumeTimer() {
    timer = setInterval(updateDisplay, 100);
    isPaused = false;
}