import './index.html';
import './styles/styles.scss';

import backgroundImage from './assets/images/background.webp';
import logoImage from './assets/images/logo.png';
import homeBtnImage from './assets/images/home.svg';
import githubImage from './assets/images/github.png';
import rsschoolImage from './assets/images/rs-school.svg';
import defaultImage from './assets/images/default-img.webp';
import gameData from './gamesData';
import wrongSound from './assets/audio/wrong.mp3';
import correctSound from './assets/audio/correct.mp3';

const categories = ['warm-up', 'racing', 'shooter', 'cyberpunk', 'rpg', 'platformer'];
let categoryIndex = 0;
let currentCategory = categories[categoryIndex];

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
  return Math.floor(array.length * Math.random());
}
let randomIndex = randomizeIndex(currentAnswers);

function createCurrentQuestion(array, index) {
  return array[index];
}
let currentQuestion = createCurrentQuestion(currentAnswers, randomIndex);

let isAnswered = false;
const maxScores = 30;
let scoresPerRound = 5; // очки, которые дают за победу в раунде;
let isPaused = false; // про setinterval в конце
let isHomePage = true;
let timerId; // таймер внутри плеера;
let isSwitched = false;

function createPlayer(game, isQuestion) {
  isSwitched = false;
  const player = document.createElement('div');
  player.className = 'player';
  const audio = new Audio();
  audio.src = game.audio;
  const timeline = document.createElement('div');
  timeline.className = 'timeline';
  const progress = document.createElement('div');
  progress.className = 'progress';
  timeline.append(progress);
  player.append(timeline);
  const controls = document.createElement('div');
  controls.className = 'controls';
  const playContainer = document.createElement('div');
  playContainer.className = 'play-container';
  const togglePlay = document.createElement('div');
  togglePlay.classList.add('toggle-play', 'play');
  playContainer.append(togglePlay);
  controls.append(playContainer);
  const time = document.createElement('div');
  time.className = 'time';
  const current = document.createElement('div');
  current.className = 'current';
  time.append(current);
  const divider = document.createElement('div');
  divider.className = 'divider';
  time.append(divider);
  const length = document.createElement('div');
  length.className = 'length';
  time.append(length);
  controls.append(time);
  const volumeContainer = document.createElement('div');
  volumeContainer.className = 'volume-container';
  const volumeBtn = document.createElement('div');
  volumeBtn.className = 'volume-button';
  const volumeIcon = document.createElement('div');
  volumeIcon.classList.add('volume', 'icono-volumeMedium');
  volumeBtn.append(volumeIcon);
  volumeContainer.append(volumeBtn);
  const volumeSlider = document.createElement('div');
  volumeSlider.className = 'volume-slider';
  const volumePercentage = document.createElement('div');
  volumePercentage.className = 'volume-percentage';
  volumeSlider.append(volumePercentage);
  volumeContainer.append(volumeSlider);
  controls.append(volumeContainer);
  player.append(controls);

  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num, 10);
    let minutes = parseInt(seconds / 60, 10);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60, 10);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }

  audio.addEventListener('loadeddata', () => {
    length.textContent = getTimeCodeFromNum(
      audio.duration,
    );
    audio.volume = 0.75;
  }, false);

  // toggle between playing and pausing on button click
  togglePlay.addEventListener('click', () => {
    if (audio.paused) {
      togglePlay.classList.remove('play');
      togglePlay.classList.add('pause');
      audio.play();
    } else {
      togglePlay.classList.remove('pause');
      togglePlay.classList.add('play');
      audio.pause();
    }
  }, false);

  // click on timeline to skip around
  timeline.addEventListener('click', (event) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = event.offsetX / parseInt(timelineWidth, 10) * audio.duration;
    audio.currentTime = timeToSeek;
  }, false);

  // click volume slider to change volume;
  volumeSlider.addEventListener('click', (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth, 10);
    audio.volume = newVolume;
    volumePercentage.style.width = `${newVolume * 100}%`;
  }, false);

  // check audio percentage and update time accordingly
  timerId = setInterval(() => {
    progress.style.width = `${audio.currentTime / audio.duration * 100}%`;
    current.textContent = getTimeCodeFromNum(
      audio.currentTime,
    );
    if (audio.duration === audio.currentTime) {
      togglePlay.classList.remove('pause');
      togglePlay.classList.add('play');
    }
    if (isHomePage || isAnswered) { // TODO: добавить переключение на другой вопрос
      audio.pause(); // TODO: зафиксить баг с тем, что трек всегда встает на паузу
      clearInterval(timerId);
    };
  }, 1000);

  return player;
}

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
          document.querySelectorAll('audio').forEach((element) => element.pause());
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

      isSwitched = true;
      /* const audio = new Audio(); */
      const audio = createPlayer(currentAnswers[i]);
/*       audio.src = currentAnswers[i].audio; */
      /* audio.controls = true; */
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

function resetState() {
  isAnswered = false;
  isPaused = false;
  currentCategory = categories[categoryIndex];
  currentAnswers = createCurrentAnswers();
  randomIndex = randomizeIndex(currentAnswers);
  currentQuestion = createCurrentQuestion(currentAnswers, randomIndex);
}

function replaceBoard() {
  resetState();
  document.querySelector('.board').replaceWith(createBoard());
}

function goToQuizPage() {
  isHomePage = false;
  const main = document.querySelector('.main');
  main.innerHTML = '';
  const score = document.createElement('div');
  score.className = 'score';
  score.innerHTML = 'Score: ';
  const scoreNum = document.createElement('span');
  scoreNum.innerHTML = '0'; // вернуть 24
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
  });
  document.querySelector('.main').append(button);
}

function createStartButton() {
  const startButton = document.createElement('button');
  startButton.className = 'main__start-button';
  startButton.innerHTML = 'START';
  startButton.onclick = goToQuizPage;
  return startButton;
}

function goToHomePage() {
  isHomePage = true;
  categoryIndex = 0;
  resetState();
  document.querySelector('.main').innerHTML = '';
  document.querySelector('.main').append(createStartButton());
  document.querySelector('.main').classList.remove('main--active');
}

function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  const logo = new Image();
  logo.src = logoImage;
  header.append(logo);
  const homeBtn = document.createElement('button');
  homeBtn.className = 'header__home-btn';
  const homeBtnImg = new Image();
  homeBtnImg.src = homeBtnImage;
  homeBtn.append(homeBtnImg);
  homeBtn.onclick = goToHomePage;
  header.append(homeBtn);

  return header;
}

function createMain() {
  const main = document.createElement('main');
  main.className = 'main';
  const startButton = createStartButton();
  main.append(startButton);
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
  rsschool.className = 'footer__rs-school';
  rsLink.append(rsschool);
  footer.append(rsLink);

  const span = document.createElement('span');
  span.innerHTML = 'Valentin Berezhnykh, 2022';
  footer.append(span);

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/vberezhnykh';
  githubLink.target = '_blank';
  const github = new Image();
  github.className = 'footer__github';
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
          /* console.log('я здесь') */
          /* clearTimeout(timerId) */
          const scoreNum = document.querySelector('.score__num');
          scoreNum.innerHTML = parseInt(scoreNum.innerHTML, 10) + scoresPerRound;
          scoresPerRound = 5;
          isPaused = true;
          if (currentCategory !== 'platformer') button.disabled = false;
          // если это последняя категория, то всплывает попап с результатами
          if (currentCategory === 'platformer' /* || currentCategory === 'warm-up' */) { // убрать ворм-ап
            // создаем прослойку между боди и попапом
            const interlayer = document.createElement('div');
            interlayer.className = 'interlayer';
            document.body.prepend(interlayer);
            // создаем попап
            const popup = document.createElement('div');
            popup.className = 'popup';
            const heading = document.createElement('h3');
            heading.className = 'popup__heading';
            const message = document.createElement('p');
            message.className = 'popup__message';
            const buttons = document.createElement('div');
            buttons.className = 'endgame-buttons';
            const yesBtn = document.createElement('button');
            yesBtn.innerHTML = 'Yes';
            yesBtn.className = 'endgame-buttons__confirm';
            yesBtn.addEventListener('click', () => {
              scoreNum.innerHTML = 0;
              categoryIndex = 0;
              replaceBoard();
              document.body.classList.remove('body--unscrollable');
              interlayer.remove();
              popup.remove();
            });
            const noBtn = document.createElement('button');
            noBtn.innerHTML = 'No';
            noBtn.className = 'endgame-buttons__decline';
            noBtn.onclick = () => {
              goToHomePage();
              document.body.classList.remove('body--unscrollable');
              interlayer.remove();
              popup.remove();
            };
            buttons.appendChild(yesBtn);
            buttons.appendChild(noBtn);
            popup.append(heading);
            popup.append(message);
            if (parseInt(scoreNum.innerHTML, 10) === maxScores) {
              heading.innerHTML = 'Congratulations!';
              // eslint-disable-next-line no-multi-str
              message.innerHTML = 'You have scored maximum of 30 points.\n\
              GAME OVER.';
            } else {
              heading.innerHTML = 'Oops...You have lost :(';
              message.innerHTML = `You have scored ${scoreNum.innerHTML} scores.\n\
              To win the game, you need to get 30 scores. Want to try again?`;
              popup.append(buttons);
            }
            interlayer.after(popup);

            document.body.classList.add('body--unscrollable');
          }
        } else button.disabled = true;
      }
    } catch { //
    }
  }, 1000);
});
