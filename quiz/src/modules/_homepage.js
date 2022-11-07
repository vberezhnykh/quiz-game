import { goToQuizPage, resetState } from './_quizpage';
import 'animate.css';
import mainMenuThemeSrc from '../assets/audio/main-menu.mp3';
import { changeVolumeBtnIcon } from './_header';

const mainMenuTheme = new Audio();
mainMenuTheme.src = mainMenuThemeSrc;
mainMenuTheme.loop = true;
mainMenuTheme.volume = 0.5;
mainMenuTheme.muted = true;

function createStartButton() {
  const startButton = document.createElement('button');
  startButton.classList.add(
    'main__start-button',
    'animate__animated',
    'animate__pulse',
    'animate__infinite',
    'animate__slow',
  );
  startButton.innerHTML = 'START';
  startButton.addEventListener('click', () => {
    goToQuizPage();
    mainMenuTheme.pause();
    const volumeBtn = document.querySelector('.header-buttons__volume-btn');
    const volumeBtnImg = document.querySelector('.header-buttons__volume-btn-img');
    volumeBtn.classList.remove('header-buttons__volume-btn--mute');
    volumeBtn.classList.add('header-buttons__volume-btn--on');
    changeVolumeBtnIcon(volumeBtn, volumeBtnImg);
    volumeBtn.classList.add('header-buttons__volume-btn--invisible');
    const homeBtn = document.querySelector('.header-buttons__home-btn');
    homeBtn.classList.remove('header-buttons__home-btn--inactive');
    homeBtn.classList.add('hvr-grow-shadow');
    homeBtn.disabled = false;
  });
  return startButton;
}

function goToHomePage() {
  mainMenuTheme.currentTime = 0;
  mainMenuTheme.play();
  const volumeBtn = document.querySelector('.header-buttons__volume-btn');
  const volumeBtnImg = document.querySelector('.header-buttons__volume-btn-img');
  changeVolumeBtnIcon(volumeBtn, volumeBtnImg);
  mainMenuTheme.muted = false;
  volumeBtn.classList.remove('header-buttons__volume-btn--invisible');
  resetState(true);
  document.querySelector('.main').innerHTML = '';
  document.querySelector('.main').append(createStartButton());
  document.querySelector('.main').classList.remove('main--active');
}

function createMain() {
  const main = document.createElement('main');
  main.className = 'main';
  const startButton = createStartButton();
  main.append(startButton);
  return main;
}

export {
  goToHomePage, createStartButton, createMain, mainMenuTheme,
};
