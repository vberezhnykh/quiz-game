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
    // прячем кнопки в хэдере и выпадающем меню
    // хэдер
    const headerGalleryBtn = document.querySelector('.header-buttons__gallery-btn');
    headerGalleryBtn.classList.add('header-buttons__gallery-btn--invisible');
    const headerVolumeBtn = document.querySelector('.header-buttons__volume-btn');
    const headerVolumeBtnImg = document.querySelector('.header-buttons__volume-btn-img');
    headerVolumeBtn.classList.remove('header-buttons__volume-btn--mute');
    headerVolumeBtn.classList.add('header-buttons__volume-btn--on');
    changeVolumeBtnIcon(headerVolumeBtn, headerVolumeBtnImg);
    headerVolumeBtn.classList.add('header-buttons__volume-btn--invisible');
    const headerHomeBtn = document.querySelector('.header-buttons__home-btn');
    headerHomeBtn.classList.remove('header-buttons__home-btn--inactive');
    headerHomeBtn.classList.add('hvr-grow-shadow');
    headerHomeBtn.disabled = false;
    // бургер меню
    const burgerGalleryBtn = document.querySelector('.burger-buttons__gallery-btn');
    burgerGalleryBtn.classList.add('burger-buttons__gallery-btn--invisible');
    const burgerVolumeBtn = document.querySelector('.burger-buttons__volume-btn');
    const burgerVolumeBtnImg = document.querySelector('.burger-buttons__volume-btn-img');
    burgerVolumeBtn.classList.remove('burger-buttons__volume-btn--mute');
    burgerVolumeBtn.classList.add('burger-buttons__volume-btn--on');
    changeVolumeBtnIcon(burgerVolumeBtn, burgerVolumeBtnImg);
    burgerVolumeBtn.classList.add('burger-buttons__volume-btn--invisible');
    const burgerHomeBtn = document.querySelector('.burger-buttons__home-btn');
    burgerHomeBtn.classList.remove('burger-buttons__home-btn--inactive');
    burgerHomeBtn.disabled = false;
    const burgerMenu = document.querySelector('.burger-menu');
    if (!burgerMenu.classList.contains('burger-menu--invisible')) {
      document.querySelector('.header-buttons__burger-btn').click();
    }
  });
  return startButton;
}

function goToHomePage(isHeader) {
  let galleryBtn;
  if (isHeader) {
    galleryBtn = document.querySelector('.header-buttons__gallery-btn');
    galleryBtn.classList.remove('header-buttons__gallery-btn--invisible');
  } else {
    galleryBtn = document.querySelector('.burger-buttons__gallery-btn');
    galleryBtn.classList.remove('burger-buttons__gallery-btn--invisible');
  }
  mainMenuTheme.currentTime = 0;
  mainMenuTheme.play();
  let volumeBtn;
  let volumeBtnImg;
  if (isHeader) {
    volumeBtn = document.querySelector('.header-buttons__volume-btn');
    volumeBtnImg = document.querySelector('.header-buttons__volume-btn-img');
  } else {
    volumeBtn = document.querySelector('.burger-buttons__volume-btn');
    volumeBtnImg = document.querySelector('.burger-buttons__volume-btn-img');
  }
  changeVolumeBtnIcon(volumeBtn, volumeBtnImg);
  mainMenuTheme.muted = false;
  if (isHeader) volumeBtn.classList.remove('header-buttons__volume-btn--invisible');
  else volumeBtn.classList.remove('burger-buttons__volume-btn--invisible');
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
