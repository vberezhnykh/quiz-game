import './index.html';
import './styles/styles.scss';

import backgroundImage from './assets/images/background.jpg';
import logoImage from './assets/images/logo.png';
import githubImage from './assets/images/github.png';
import rsschoolImage from './assets/images/rs-school.svg';
import defaultImage from './assets/images/default-img.png';
import gameData from './gamesData';
import wrongSound from './assets/audio/wrong.mp3';
import correctSound from './assets/audio/correct.mp3';

let currentPage = 'home';
const categories = ['warm-up', 'racing', 'shooter', 'cyberpunk', 'rpg', 'platformer'];
let categoryIndex = 0;
let currentCategory = categories[categoryIndex];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function createCurrentAnswers() {
  const array = [];
  gameData.forEach((elem) => {
    if (elem.category === currentCategory) array.push(elem);
  });
  shuffleArray(array);
  return array;
}
let currentAnswers = createCurrentAnswers();
function randomizeIndex(array) {
  return Math.floor(array.length * Math.random())
}
let randomIndex = randomizeIndex(currentAnswers);
function createCurrentQuestion(array, index) {
  return array[index];
}
let currentQuestion = createCurrentQuestion(currentAnswers, randomIndex);
let isAnswered = false;
let scoresPerRound = 5; // очки, которые дают за победу в раунде;
let isPaused = false; // про setinterval;

function createQuestion() {
  const questionSection = document.createElement('section');
  questionSection.className = 'question';
  const defaultImg = new Image();
  defaultImg.className = 'question__img';
  defaultImg.src = defaultImage;
  questionSection.append(defaultImg);

  const question = document.createElement('article');
  const heading = document.createElement('h3');
  heading.className = 'question__heading';
  heading.textContent = '****';
  question.append(heading);
  const audio = new Audio();
  audio.src = currentQuestion.audio;
  audio.controls = true;
  question.append(audio);
  questionSection.append(question);

  return questionSection;
}

function createAnswers() {
  // создаем секцию с ответами
  const answersSection = document.createElement('section');
  answersSection.className = 'answers';
  // создаем блок с описанием игры
  const description = document.createElement('article');
  description.className = 'description';
  description.innerHTML = 'Listen to the main theme from the video game. Name it.';
  // создаем список ответов
  const answersList = document.createElement('ul');
  answersList.className = 'answers-list';
  for (let i = 0; i < 6; i += 1) {
    const answer = document.createElement('li');
    answer.className = 'answers-list__item';
    answer.innerHTML = currentAnswers[i].name;
    answer.addEventListener('click', () => {
      if (!isAnswered) {
        if (currentAnswers[i] === currentQuestion) {
          answer.className = 'answers-list__item--correct';
          const correct = new Audio();
          correct.src = correctSound;
          correct.play();
          isAnswered = true;
          const questionImg = document.querySelector('.question__img');
          questionImg.src = currentQuestion.image;
          const questionHeading = document.querySelector('.question__heading');
          questionHeading.innerHTML = currentQuestion.name;
        } else {
          answer.className = 'answers-list__item--wrong';
          const wrong = new Audio();
          wrong.src = wrongSound;
          wrong.play();
          scoresPerRound -= 1;
        }
      }
      // добавляем описание игры
      description.innerHTML = '';
      const cover = new Image();
      cover.className = 'description__cover';
      cover.src = currentAnswers[i].cover;
      description.append(cover);
      const container = document.createElement('div');
      const heading = document.createElement('h4');
      heading.className = 'description__heading';
      heading.innerHTML = currentAnswers[i].name;
      container.append(heading);

      const text = document.createElement('p');
      text.innerHTML = currentAnswers[i].description;
      container.append(text);

      const audio = new Audio();
      audio.src = currentAnswers[i].audio;
      audio.controls = true;
      container.append(audio);

      description.append(container);
    });
    answersList.append(answer);
  }
  answersSection.append(answersList);
  answersSection.append(description);

  return answersSection;
}

function createBoard() {
  // создаем поле викторины
  const board = document.createElement('div');
  board.className = 'board';
  // создаем блок с категориями вопросов
  const categoriesContainer = document.createElement('div');
  categoriesContainer.className = 'categories';
  for (let i = 0; i < 6; i += 1) {
    const category = document.createElement('div');
    category.className = 'categories__item';
    if (i === categoryIndex) category.classList.add('categories__item--active');
    category.innerHTML = categories[i];
    categoriesContainer.append(category);
  }
  board.append(categoriesContainer);
  // создаем вопрос
  const question = createQuestion();
  board.append(question);
  // создаем варианты ответов
  const answers = createAnswers();
  board.append(answers);

  return board;
}

function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  const logo = new Image();
  logo.src = logoImage;
  header.append(logo);
  // создаем ссылки на страницы приложения
  const nav = document.createElement('nav');
  const list = document.createElement('ul');
  list.className = 'navigation';
  const elements = ['home', 'quiz', 'results'];
  for (let i = 0; i < 3; i += 1) {
    const item = document.createElement('li');
    item.innerHTML = elements[i];
    item.className = 'navigation__item';
    // при загрузке активной является страница home
    if (elements[i] === 'home') item.classList.add('navigation__item--active');
    item.addEventListener('click', (event) => {
      list.childNodes.forEach((elem) => elem.classList.remove('navigation__item--active'));
      event.target.classList.add('navigation__item--active');
      currentPage = event.target.innerHTML;
      if (event.target.innerHTML === 'quiz') {
        document.querySelector('.main').innerHTML = '';
        const score = document.createElement('div');
        score.className = 'score';
        score.innerHTML = 'Score: ';
        const scoreNum = document.createElement('span');
        scoreNum.innerHTML = '0';
        scoreNum.className = 'scoreNum';
        score.append(scoreNum);
        document.querySelector('.main').append(score);
        document.querySelector('.main').append(createBoard());
        const button = document.createElement('button');
        button.innerHTML = 'Next Level';
        button.className = 'main__button';
        button.disabled = true;
        button.addEventListener('click', () => {
          isAnswered = false;
          isPaused = false;
          categoryIndex += 1;
          currentCategory = categories[categoryIndex];
          currentAnswers = createCurrentAnswers();
          randomIndex = randomizeIndex(currentAnswers);
          currentQuestion = createCurrentQuestion(currentAnswers, randomIndex);
          document.querySelector('.board').replaceWith(createBoard());
        })
        document.querySelector('.main').append(button);
      };
      if (event.target.innerHTML === 'home') {
        isAnswered = false;
        isPaused = false;
        categoryIndex = 0;
        currentCategory = categories[categoryIndex];
        currentAnswers = createCurrentAnswers();
        randomIndex = randomizeIndex(currentAnswers);
        currentQuestion = createCurrentQuestion(currentAnswers, randomIndex);
        document.querySelector('.main').innerHTML = 'THE GAME WILL SOON BEGIN';
      } 
    });
    list.append(item);
  }
  nav.append(list);
  header.append(nav);

  return header;
}

function createMain() {
  const main = document.createElement('main');
  main.className = 'main';
  main.innerHTML = 'THE GAME WILL SOON BEGIN';
  return main;
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const rsLink = document.createElement('a');
  rsLink.href = 'https://rs.school/js/';
  rsLink.target = '_blank';
  const rsschool = new Image();
  rsschool.src = rsschoolImage;
  rsLink.append(rsschool);
  footer.append(rsLink);

  const span = document.createElement('span');
  span.innerHTML = 'Valentin Berezhnykh, 2022';
  footer.append(span);

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/vberezhnykh';
  githubLink.target = '_blank';
  const github = new Image();
  github.src = githubImage;
  githubLink.append(github);
  footer.append(githubLink);

  return footer;
}

function createStartingPage() {
  document.body.style.backgroundImage = `url(${backgroundImage})`;

  const header = createHeader();
  document.body.append(header);

  const main = createMain();
  document.body.append(main);

  const footer = createFooter();
  document.body.append(footer);
}

window.onload = createStartingPage;
window.addEventListener('load', () => {
  setInterval(() => {
    try {
      const button = document.querySelector('.main__button');
      if (!isPaused) {
        if (isAnswered) {
          const scoreNum = document.querySelector('.scoreNum');
          scoreNum.innerHTML = parseInt(scoreNum.innerHTML, 10) + scoresPerRound;
          scoresPerRound = 5;
          isPaused = true;
          button.disabled = false;
        } else button.disabled = true;
      }
      console.log('я работаю');
    } catch { //
    }
  }, 1000);
});
