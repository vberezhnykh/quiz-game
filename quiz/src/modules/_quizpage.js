/* eslint-disable prefer-const */
import defaultImage from '../assets/images/default-img.webp';
import { createPlayer, updateSongStatus } from './_player';
import gameData from '../gamesData';
import wrongSound from '../assets/audio/wrong.mp3';
import correctSound from '../assets/audio/correct.mp3';
import createPopup from './_popup';
import { descriptionSong } from './_gallery';

const correctAnswer = new Audio();
correctAnswer.src = correctSound;
const wrongAnswer = new Audio();
wrongAnswer.src = wrongSound;
const questionSong = new Audio();
const answerSong = new Audio();

let language;
if (localStorage.language === undefined) language = 'en';
else language = localStorage.language;

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
let categories;
if (language === 'en') categories = ['warm-up', 'racing', 'shooter', 'cyberpunk', 'rpg', 'platformer'];
else categories = ['разминка', 'гонки', 'шутер', 'киберпанк', 'ролевая', 'платформер'];
let categoryIndex = 0;
let currentCategory = categories[categoryIndex];

function createCurrentAnswers() {
  const array = [];
  gameData.forEach((elem) => {
    if (elem[language].category === currentCategory) array.push(elem);
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

let isAnswered = false;
let scoresPerRound = 5;
let isPointsScored = true;

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
  const player = createPlayer(currentQuestion, questionSong);
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
  if (language === 'en') description.textContent = 'Listen to the main theme from the video game. Name it.';
  else description.textContent = 'Послушайте заглавную тему из видеоигры. Назовите игру.';
  // создаем список ответов
  const answersList = document.createElement('ul');
  answersList.className = 'answers-list';
  for (let i = 0; i < 6/* categories.length */; i += 1) {
    const answer = document.createElement('li');
    answer.className = 'answers-list__item';
    answer.textContent = currentAnswers[i][language].name;
    // eslint-disable-next-line no-loop-func
    answer.addEventListener('click', () => {
      if (!isAnswered) {
        if (currentAnswers[i] === currentQuestion) {
          isPointsScored = false;
          answer.className = 'answers-list__item--correct';
          correctAnswer.play();
          isAnswered = true;
          const questionImg = document.querySelector('.question__img');
          questionImg.src = currentQuestion.image;
          const questionHeading = document.querySelector('.question__heading');
          questionHeading.textContent = currentQuestion[language].name;
          questionSong.pause();
          document.querySelector('.toggle-play').classList.add('play');
          document.querySelector('.toggle-play').classList.remove('pause');
        } else {
          answer.className = 'answers-list__item--wrong';
          wrongAnswer.play();
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
      heading.textContent = currentAnswers[i][language].name;
      textContainer.append(heading);

      const text = document.createElement('p');
      text.textContent = currentAnswers[i][language].description;
      textContainer.append(text);

      const link = document.createElement('a');
      link.className = 'description__link';
      link.href = currentAnswers[i][language].link;
      link.target = '_blank';
      const moreInfoText = document.createElement('p');
      if (language === 'en') moreInfoText.textContent = 'Read more...';
      else moreInfoText.textContent = 'Узнать больше...';
      link.append(moreInfoText);
      textContainer.append(link);
      container.append(textContainer);
      description.append(container);

      if (currentAnswers[i] !== currentQuestion) {
        const audio = createPlayer(currentAnswers[i], answerSong);
        audio.classList.add('description__audio');
        description.append(audio);
      }
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
  answerSong.pause();

  return board;
}

function resetState(isHardReset) {
  if (isHardReset) {
    categoryIndex = 0;
    questionSong.src = '';
    answerSong.src = '';
  }
  isAnswered = false;
  isPointsScored = true;
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
  const main = document.querySelector('.main');
  main.innerHTML = '';
  const score = document.createElement('div');
  score.className = 'score';
  if (language === 'en') score.textContent = 'Score: ';
  else score.textContent = 'Очки: ';
  const scoreNum = document.createElement('span');
  scoreNum.innerHTML = '0';
  scoreNum.className = 'score__num';
  score.append(scoreNum);
  main.append(score);
  main.append(createBoard());
  main.classList.add('main--active');
  const button = document.createElement('button');
  if (language === 'en') button.innerHTML = 'Next round';
  else button.innerHTML = 'Далее';
  button.className = 'main__button';
  button.disabled = true;
  button.addEventListener('click', () => {
    if (categoryIndex !== categories.length - 1) categoryIndex += 1;
    replaceBoard();
    button.disabled = true;
    button.classList.remove('main__button--active');
    button.classList.remove('hvr-sweep-to-right');
  });
  document.querySelector('.main').append(button);
}

function checkState() {
  setInterval(() => {
    try {
      if (isAnswered && !isPointsScored) {
        isPointsScored = true;
        const scoreNum = document.querySelector('.score__num');
        scoreNum.innerHTML = parseInt(scoreNum.innerHTML, 10) + scoresPerRound;
        scoresPerRound = 5;
        const button = document.querySelector('.main__button');
        button.classList.add('main__button--active');
        button.classList.add('hvr-sweep-to-right');
        button.disabled = false;
        // если это последняя категория, то всплывает попап с результатами
        if (categoryIndex === categories.length - 1) {
          createPopup(language);
          button.disabled = true;
          button.classList.remove('main__button--active');
          button.classList.remove('hvr-sweep-to-right');
        }
      }
      if (!descriptionSong.paused) updateSongStatus(descriptionSong, false);
      if (!questionSong.paused) updateSongStatus(questionSong);
      if (!answerSong.paused) updateSongStatus(answerSong, true);
    } catch (error) {
      /* throw new Error(error); */
    }
  }, 1000);
}

export {
  goToQuizPage, checkState, resetState, replaceBoard, answerSong, questionSong,
};
