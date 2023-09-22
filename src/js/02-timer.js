import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;
let flatpickrInstance;

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
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const targetDate = new Date(dateTimePicker.value).getTime();
  const now = new Date().getTime();
  const timeDifference = targetDate - now;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    daysValue.textContent = '00';
    hoursValue.textContent = '00';
    minutesValue.textContent = '00';
    secondsValue.textContent = '00';
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
  
  if (timeDifference <= 0) {
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
}

startButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
});

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      alert("Please choose a date in the future");
      dateTimePicker._flatpickr.clear();
    }
  },
};

flatpickrInstance = flatpickr(dateTimePicker, options);