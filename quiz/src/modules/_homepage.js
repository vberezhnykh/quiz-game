import { goToQuizPage, resetState } from './_quizpage';
import 'animate.css';

function createStartButton() {
  const startButton = document.createElement('button');
  startButton.classList.add('main__start-button', 'animate__animated', 'animate__pulse', 'animate__infinite', 'animate__slow');
  startButton.innerHTML = 'START';
  startButton.onclick = goToQuizPage;
  return startButton;
}

function goToHomePage() {
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

export { goToHomePage, createStartButton, createMain };
