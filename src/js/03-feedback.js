const throttle = require("lodash.throttle");


const inputEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const formEl = document.querySelector('.feedback-form');
const formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
inputEl.addEventListener('input', throttle(onInput, 500));
messageEl.addEventListener('input', throttle(onInput, 500));
formEl.addEventListener('submit', onSubmit);

//  


// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
function onInput(event) {
     

      let savedInputs = localStorage.getItem('feedback-form-state');
    savedInputs = savedInputs ? JSON.parse(savedInputs) : {};
    
  savedInputs[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(savedInputs));
}

// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
function onSubmit(event) {
    event.preventDefault();

    formData.email = inputEl.value;
    formData.message = messageEl.value;

    console.log(formData);
    
    const { email, message } = event.target.elements;
    if (email.value === "" || message.value === "") {
        return
    }
    event.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    formData.email = '';
    formData.message = '';
    }
    
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
function fillForm() {
    const savedData = localStorage.getItem('feedback-form-state');
    const formObject = JSON.parse(savedData);

    
    if (formObject[inputEl.name]) {
     inputEl.value = formObject.email;
}
   
    if (formObject[messageEl.name]) {
        messageEl.value = formObject.message;
        }

};
if (localStorage.getItem('feedback-form-state')) {
  fillForm();
}