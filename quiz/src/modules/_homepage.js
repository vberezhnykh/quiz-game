import { goToQuizPage, resetState } from './_quizpage';
import 'animate.css';
import mainMenuThemeSrc from '../assets/audio/main-menu.mp3';

const mainMenuTheme = new Audio();
mainMenuTheme.src = mainMenuThemeSrc;
mainMenuTheme.loop = true;
mainMenuTheme.volume = 0.5;

function createStartButton() {
  const startButton = document.createElement('button');
  startButton.classList.add('main__start-button', 'animate__animated', 'animate__pulse', 'animate__infinite', 'animate__slow');
  startButton.innerHTML = 'START';
  startButton.addEventListener('click', () => {
    goToQuizPage();
    mainMenuTheme.pause();
  });
  return startButton;
}

function goToHomePage() {
  mainMenuTheme.currentTime = 0;
  mainMenuTheme.play();
  resetState(true);
  document.querySelector('.main').innerHTML = '';
  document.querySelector('.main').append(createStartButton());
  document.querySelector('.main').classList.remove('main--active');
}

function createMain() {
  mainMenuTheme.play();
  const main = document.createElement('main');
  main.className = 'main';
  const startButton = createStartButton();
  main.append(startButton);
  return main;
}

export { goToHomePage, createStartButton, createMain };
