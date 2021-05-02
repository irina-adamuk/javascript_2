'use strict';

// ? 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// ? Придумать шаблон, который заменяет одинарные кавычки на двойные.

// One: 'Hi Mary.' Two: 'Oh, hi.'
// One: 'How are you doing?'
// Two: 'I'm doing alright. How about you?'
// One: 'Not too bad. The weather is great isn't it?'
// Two: 'Yes. It's absolutely beautiful today.'
// One: 'I wish it was like this more frequently.'
// Two: 'Me too.'
// One: 'So where are you going now?'
// Two: 'I'm going to meet a friend of mine at the department store'
// One: 'Going to do a little shopping?'
// Two: 'Yeah, I have to buy some presents for my parents.'
// One: 'What's the occasion?'
// Two: 'It's their anniversary.'
// One: 'That's great. Well, you better get going. You don't want to be late.'
// Two: 'I'll see you next time.'
// One: 'Sure.' Bye.'

const str = `One: 'Hi Mary.' 
Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'
`;

// let regExp = /'/gm;

// let resultText = str.replace(regExp, '"');
// document.querySelector('div').innerText = resultText;

// ? 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

let regExp = /\B'/gm;

let resultText = str.replace(regExp, '"');
document.querySelector('.block').innerText = resultText;


// ? 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// ? a. Имя содержит только буквы.
// ? b. Телефон имеет вид +7(000)000-0000.
// ? c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// ? d. Текст произвольный.
// ? e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

const btn = document.querySelector('.btn');
btn.addEventListener('click', (event) => {
   const form = document.querySelector('form');
   let errorBlock = document.querySelector('.error');
   let userName = document.querySelector('#name');
   let userTel = document.querySelector('#phone');
   let userEmail = document.querySelector('#e-mail');
   checkUserName();
   checkUserTel();
   checkUserEmail();

   function checkUserName(){
      let regExp = /^[a-zа-яё]+$/ig;
      if(regExp.test(userName.value) === false) {
         userName.classList.add('input-red');
         event.preventDefault();
         errorBlock.innerText = 'Форма заполнена не верно, проверьте все данные';
      }
   }
   
   function checkUserTel() {
      let regExp = /^\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/ig;
      if(regExp.test(userTel.value) === false) {
         userTel.classList.add('input-red');
         event.preventDefault();
         errorBlock.innerText = 'Форма заполнена не верно, проверьте все данные';
      }
   }
   
   function checkUserEmail() {
      let regExp =/[\w._-]+@\w+\.[a-z]{2,4}$/ig;
      if(regExp.test(userEmail.value) === false) {
         userEmail.classList.add('input-red');
         event.preventDefault();
         errorBlock.innerText = 'Форма заполнена не верно, проверьте все данные';
      }
   }
});







