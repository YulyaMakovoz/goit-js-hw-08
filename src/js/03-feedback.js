


throttle = require("lodash.throttle");


const inputEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const formEl = document.querySelector('.feedback-form');
const formData = {};


// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
inputEl.addEventListener('input', throttle(onInput, 500));
messageEl.addEventListener('input', throttle(onInput, 500));
// inputEl.addEventListener('input',onInput);
// messageEl.addEventListener('input',onInput);
formEl.addEventListener('submit', onSubmit);
fillForm();


// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
function onInput(event) {
    // const mail = inputEl.value;
    // const message = messageEl.value;
    // const formData = { mail, message };

    formData[event.target.name] = event.target.value;

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    
}

// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
function onSubmit(event) {
    event.preventDefault();

    formData.email = inputEl.value;
    formData.message = messageEl.value;

    // const savedData = localStorage.getItem('feedback-form-state');
    console.log(formData);
    formEl.reset();
    localStorage.removeItem('feedback-form-state');
    
    // event.currentTarget.reset();
}
    
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
function fillForm() {
    const savedData = localStorage.getItem('feedback-form-state');
    const formObject = JSON.parse(savedData);

    if('feedback-form-state') {
        inputEl.value = formObject.email;
        messageEl.value = formObject.message;
        // const savedEmail = formObject.email;
        // inputEl.value = savedEmail;
        // const savedMessage = formObject.message;
        // messageEl.value = savedMessage;
    };
};