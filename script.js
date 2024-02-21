const screens = document.querySelectorAll('.screen');
const startBtn = document.getElementById('start-btn');
const sweetBtn = document.querySelectorAll('.choose-sweet-btn');
const timeBox = document.getElementById('time');
const scoreBox = document.getElementById('score');
const gameScreen = document.getElementById('game-container');
const current = document.getElementById('current');
const record = document.getElementById('record');

let selectedSweet = {};
let seconds = 0;
let score = Number (localStorage.getItem('lastScore'));
let best = Number (localStorage.getItem('record'));
let fadeEffect;
let timeInt;

function play() {
    console.log(screens);
    screens[0].classList.remove('visible');
    screens[1].classList.add('visible');
}

function playAgain() {
    screens[1].classList.remove('visible');
    screens[0].classList.add('visible');
}

function chooseSweet(currentBtn) {
    const currentId = currentBtn.getAttribute('id');
    const currentImg = currentBtn.querySelector('img');
    const currentSrc = currentImg.getAttribute('src');
    const currentAlt = currentImg.getAttribute('alt');

    selectedSweet = {currentId, currentSrc, currentAlt};
    console.log(selectedSweet);
    screens[1].classList.remove('visible');
    screens[2].classList.add('visible');
    startGame();
    const createrInt1 = setTimeout(createSweet, 1000);
    const createrInt2 = setTimeout(createSweet, 1500)
}

function startGame() {
    seconds = 0; 
    score = 0;
    message.classList.remove("visible");
    timeStyle(seconds);
    timeBox.innerHTML = `Время: ${seconds} с.`
    timeInt = setInterval(increaseTime, 1000);
}

function increaseTime() {
    let s = seconds % 60;

    timeStyle(s);

    timeBox.innerHTML = `Время: ${s} с.`;
    if (seconds < 15) {
        seconds++;
    } else {
        message.classList.add("visible");
        scoreBox.innerHTML = `Счет: ${score}`;
        const sweets = document.querySelectorAll('.sweet');
        sweets.forEach(el => {
            el.remove();
        });
        saveData();
        clearInterval(timeInt);
        getStats();
    }
    
}

function increaseScore() {
    score++;

    scoreBox.innerHTML = `Счет: ${score}`;
}

function timeStyle(time) {
    time = time < 10 ? `0${time}` : time;
}

function createSweet() {
    const {x, y} = getRandomPosition();

    const sweet = document.createElement('img');
    sweet.classList.add('sweet');
    sweet.setAttribute('id', selectedSweet.currentId);
    sweet.setAttribute('src', selectedSweet.currentSrc);
    sweet.setAttribute('alt', selectedSweet.currentAlt);
    sweet.setAttribute('onclick', 'clickSweet(this)');
    sweet.style.display = 'block';
    sweet.style.top = `${y}px`;
    sweet.style.left = `${x}px`;
    sweet.style.opacity = 1;
    sweet.style.transform = `rotate(${Math.random() * 360}deg)`;

    console.log(sweet.style.left)

    gameScreen.appendChild(sweet);
}

function getRandomPosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    console.log(x, y)

    return {x, y};
}

function clickSweet(sweet) {
    sweet.remove();
    increaseScore();
    createSweet();
    playBiteSound();
}


function playBiteSound() {
    const audio = document.getElementById("bite");
    audio.play();
}

function getStats() {
    checkRecord();
    current.innerHTML = `Последний результат: ${score}`;
    record.innerHTML = `Лучший результат: ${best}`;
}

function checkRecord() {
    if (score >= best) {
        best = score;
    }
}

getStats();

function saveData() {
    localStorage.setItem('lastScore', score);
    localStorage.setItem('record', best);
}