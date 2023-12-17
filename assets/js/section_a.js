const AnewYear = "1/1/2024";

const AdayTime = document.querySelector('.day');
const AhourTime = document.querySelector('.hour');
const AminuteTime = document.querySelector('.minute');
const AsecondTime = document.querySelector('.second');

function AtimeCountDown() {
    const AnowDate = new Date();
    const newYearDate = new Date(AnewYear);
    const totalSeconds = (newYearDate - AnowDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    AdayTime.textContent = AformatTime(days);
    AhourTime.textContent = AformatTime(hours);
    AminuteTime.textContent = AformatTime(minutes);
    AsecondTime.textContent = AformatTime(seconds);
}

function AformatTime(time) {
    return time > 10 ? time : `0${time}`;
}

AtimeCountDown()
setInterval(AtimeCountDown, 1000);