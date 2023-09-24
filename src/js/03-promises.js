const form = document.querySelector('.form');
const output = document.createElement('div');
document.body.appendChild(output);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delayInput = parseInt(form.querySelector('input[name="delay"]').value);
  const stepInput = parseInt(form.querySelector('input[name="step"]').value);
  const amountInput = parseInt(form.querySelector('input[name="amount"]').value);

  output.innerHTML = '';

  for (let i = 1; i <= amountInput; i++) {
    const position = i;
    const delay = delayInput + (i - 1) * stepInput;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        output.innerHTML += `<p>✅ Fulfilled promise ${position} in ${delay}ms</p>`;
      })
      .catch(({ position, delay }) => {
        console.error(`❌ Rejected promise ${position} in ${delay}ms`);
        output.innerHTML += `<p>❌ Rejected promise ${position} in ${delay}ms</p>`;
      });
  }
});
