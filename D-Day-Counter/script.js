const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector("#d-day-container");
const intervalIdArr = [];

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
        setClearInterval();
        return;

    } else if (isNaN(remaining)) {
        //잘못된 날짜가 입력되었을 때
        container.style.display = 'none';
        messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>"
        messageContainer.style.display = 'flex';
        setClearInterval();
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

    //100번까지만 반복 가능
    // for (let i = 0; i < 100; i++) {
    //     setTimeout(counterMaker, 1000 * i);
    // }

    //setInterval()이 1초 뒤에 실행되기 때문에 counterMaker() 한 번 먼저 실행
    counterMaker()
    //1초마다 counterMaker()함수 실행. 1초 뒤에 실행
    const intervalId = setInterval(counterMaker, 1000);// return값은 반복되는 코드 interval의 id값
    intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
    container.style.display = 'none';
    messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요</h3>";
    messageContainer.style.display = 'flex';
    for (let i = 0; i < intervalIdArr.length; i++) {
        clearInterval(intervalIdArr[i]);
    }
};