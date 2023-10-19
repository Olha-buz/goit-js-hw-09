import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', clickForm);

function clickForm(evt) {
    evt.preventDefault();
    const formElement = evt.currentTarget.elements;
    const delay = Number(formElement.delay.value);
    const step = Number(formElement.step.value);
    const amount = Number(formElement.amount.value);

    for (let i = 0; i < amount; i++) {
        createPromise(i+1, delay+step*i)
          .then(({ position, delay }) => {
           Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
          .catch(({ position, delay }) => {
           Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });  
    }

}

function createPromise(position, delay) {
 return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
     setTimeout(() => {
         if (shouldResolve) {
             resolve({ position, delay });
         } else {
             reject({ position, delay });
         }
     }, delay);
  });
};
