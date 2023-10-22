import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const selectors = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds'),
}

startBtn.disabled = true;
let targetTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= new Date()) {
          Notify.failure('Please choose a date in the future');
            return;
      } else {
          startBtn.disabled = false;
          targetTime = selectedDates[0];
      }
  },
};

const select = document.querySelector('#datetime-picker');
flatpickr(select, options);

startBtn.addEventListener('click', startBtnClick);

function startBtnClick() {
    startBtn.disabled = true;
    const timerId = setInterval(() => {
        const currentDate = new Date();
        const selectDate = targetTime - currentDate;
        if (selectDate <= 0) {
            clearInterval(timerId);
            return;
        };
        const { days, hours, minutes, seconds } = convertMs(selectDate);
        selectors.days.textContent = addLeadingZero(days);
        selectors.hours.textContent = addLeadingZero(hours);
        selectors.minutes.textContent = addLeadingZero(minutes);
        selectors.seconds.textContent = addLeadingZero(seconds);
    }, 1000)

};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};