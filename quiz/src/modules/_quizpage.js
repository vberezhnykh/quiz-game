/* eslint-disable prefer-const */
import defaultImage from '../assets/images/default-img.webp';
import createPlayer from './_player';
import gameData from '../gamesData';
import wrongSound from '../assets/audio/wrong.mp3';
import correctSound from '../assets/audio/correct.mp3';
import createPopup from './_popup';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    // eslint-disable-next-line no-param-reassign
    array[i] = array[j];
    // eslint-disable-next-line no-param-reassign
    array[j] = temp;
  }
}
const categories = ['warm-up', 'racing', 'shooter', 'cyberpunk', 'rpg', 'platformer'];
let categoryIndex = 0;
let currentCategory = categories[categoryIndex];

function createCurrentAnswers() {
  const array = [];
  gameData.forEach((elem) => {
    if (elem.category === currentCategory) array.push(elem);
  });
  shuffleArray(array);
  return array;
}
let currentAnswers = createCurrentAnswers();

function createCurrentQuestion(array, index) {
  return array[index];
}

function randomizeIndex(array) {
  return Math.floor(array.length * Math.random());
}
let randomIndex = randomizeIndex(currentAnswers);
let currentQuestion = createCurrentQuestion(currentAnswers, randomIndex);

let isPaused = false; // про setinterval в конце
let isAnswered = false;
let scoresPerRound = 5; // очки, которые дают за победу в раунде;

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
  const player = createPlayer(currentQuestion);
  question.append(player);
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
  for (let i = 0; i < categories.length; i += 1) {
    const answer = document.createElement('li');
    answer.className = 'answers-list__item';
    answer.innerHTML = currentAnswers[i].name;
    // eslint-disable-next-line no-loop-func
    answer.addEventListener('click', () => {
      if (!isAnswered) {
        if (currentAnswers[i] === currentQuestion) {
          /* document.querySelectorAll('audio').forEach((element) => element.pause()); */
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
      const container = document.createElement('div');
      container.className = 'description-container';
      const cover = new Image();
      cover.className = 'description__cover';
      cover.src = currentAnswers[i].cover;
      container.append(cover);

      const textContainer = document.createElement('div');
      const heading = document.createElement('h4');
      heading.className = 'description__heading';
      heading.innerHTML = currentAnswers[i].name;
      textContainer.append(heading);

      const text = document.createElement('p');
      text.innerHTML = currentAnswers[i].description;
      textContainer.append(text);
      container.append(textContainer);
      description.append(container);

      const audio = createPlayer(currentAnswers[i]);
      audio.classList.add('description__audio');
      description.append(audio);
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
  for (let i = 0; i < categories.length; i += 1) {
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

function resetState(isHardReset) {
  if (isHardReset) categoryIndex = 0;
  isAnswered = false;
  isPaused = false;
  currentCategory = categories[categoryIndex];
  currentAnswers = createCurrentAnswers();
  randomIndex = randomizeIndex(currentAnswers);
  currentQuestion = createCurrentQuestion(currentAnswers, randomIndex);
}

function replaceBoard(isRestart) {
  if (isRestart) resetState(true);
  else resetState();
  document.querySelector('.board').replaceWith(createBoard());
}

function goToQuizPage() {
  /* isHomePage = false; */
  const main = document.querySelector('.main');
  main.innerHTML = '';
  const score = document.createElement('div');
  score.className = 'score';
  score.innerHTML = 'Score: ';
  const scoreNum = document.createElement('span');
  scoreNum.innerHTML = '0';
  scoreNum.className = 'score__num';
  score.append(scoreNum);
  main.append(score);
  main.append(createBoard());
  main.classList.add('main--active');
  const button = document.createElement('button');
  button.innerHTML = 'Next Level';
  button.className = 'main__button';
  button.disabled = true;
  button.addEventListener('click', () => {
    if (categoryIndex !== categories.length - 1) categoryIndex += 1;
    replaceBoard();
    button.disabled = true;
  });
  document.querySelector('.main').append(button);
}

function checkState() {
  setInterval(() => {
    try {
      const button = document.querySelector('.main__button');
      if (!isPaused) {
        if (isAnswered) {
          const scoreNum = document.querySelector('.score__num');
          scoreNum.innerHTML = parseInt(scoreNum.innerHTML, 10) + scoresPerRound;
          scoresPerRound = 5;
          isPaused = true;
          // если это последняя категория, то всплывает попап с результатами
          if (categoryIndex === categories.length - 1) createPopup();
          button.disabled = false;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }, 1000);
}

export {
  goToQuizPage, checkState, resetState, replaceBoard,
};
