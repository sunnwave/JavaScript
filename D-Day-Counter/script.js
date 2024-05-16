const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector("#d-day-container");

container.style.display = 'none';
messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요</h3>";

const dateFormMaker = function () {
    const inputYear = document.querySelector('#target-year-input').value;
    const inputMonth = document.querySelector('#target-month-input').value;
    const inputDay = document.querySelector('#target-day-input').value;
    const dateFormat = `${inputYear}-${inputMonth}-${inputDay}`

    return dateFormat;
};

const counterMaker = function () {
    const targetDateInput = dateFormMaker();
    const nowDate = new Date();
    const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
    const remaining = (targetDate - nowDate) / 1000;

    if (remaining <= 0) {
        //타이머가 종료되었을 때
        container.style.display = 'none';
        messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>"
        messageContainer.style.display = 'flex';
        return;

    } else if (isNaN(remaining)) {
        //잘못된 날짜가 입력되었을 때
        container.style.display = 'none';
        messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>"
        messageContainer.style.display = 'flex';
        return;
    }

    const remainingObj = {
        remainingDate: Math.floor(remaining / 3600 / 24),
        remainingHours: Math.floor(remaining / 3600) % 24,
        remainingMin: Math.floor(remaining / 60) % 60,
        remainingSec: Math.floor(remaining) % 60
    }

    const documentArr = ['days', 'hours', 'min', 'sec'];
    const timeKeys = Object.keys(remainingObj);

    let i = 0;
    for (let tag of documentArr) {
        document.getElementById(tag).textContent = remainingObj[timeKeys[i]];
        i++;
    }
};

const starter = function () {
    container.style.display = 'flex'
    messageContainer.style.display = 'none';
    counterMaker();
};