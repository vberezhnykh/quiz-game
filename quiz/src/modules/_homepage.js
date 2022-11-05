import { goToQuizPage, resetState } from './_quizpage';

function createStartButton() {
  const startButton = document.createElement('button');
  startButton.className = 'main__start-button';
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
