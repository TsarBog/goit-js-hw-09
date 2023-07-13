import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const selectors = {
  inputElement: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  dayEl: document.querySelector('.value[data-days]'),
  hourEl: document.querySelector('.value[data-hours]'),
  minEl: document.querySelector('.value[data-minutes]'),
  secEl: document.querySelector('.value[data-seconds]'),
};

selectors.startBtn.disabled = true;

let selectedDate = null;
let dateDifference = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    dateDifference = selectedDate - options.defaultDate.getTime();
    wrongDate();
    selectors.startBtn.addEventListener('click', countDownTimer);
  },
};

flatpickr(selectors.inputElement, options);

function wrongDate() {
  if (selectedDate >= options.defaultDate.getTime()) {
    selectors.startBtn.disabled = false;
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
    selectors.startBtn.disabled = true;
  }
}

function countDownTimer() {
  selectors.startBtn.disabled = true;
  const intervalId = setInterval(() => {
    dateDifference -= 1000;
    const { days, hours, minutes, seconds } = convertMs(dateDifference);
    selectors.dayEl.textContent = addLeadingZero(days);
    selectors.hourEl.textContent = addLeadingZero(hours);
    selectors.minEl.textContent = addLeadingZero(minutes);
    selectors.secEl.textContent = addLeadingZero(seconds);
    if (dateDifference < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value.toString().length >= 2) {
    return value;
  }
  return value.toString().padStart(2, '0');
}

// const timeCount = () => {
// 		let now = new Date();
// 		let leftUntil = newYear - now;
		
// 		let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
// 		let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
// 		let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
// 		let seconds = Math.floor(leftUntil / 1000) % 60;

// 		daysVal.textContent = days;
// 		hoursVal.textContent =	hours;
// 		minutesVal.textContent = minutes;
// 		secondsVal.textContent = seconds;


// 	timeCount();
// 	setInterval(timeCount, 1000);