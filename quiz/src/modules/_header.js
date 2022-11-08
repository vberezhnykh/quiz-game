/* eslint-disable no-param-reassign */
import logoImage from '../assets/images/logo.png';
import homeBtnImage from '../assets/images/home.svg';
import { goToHomePage, mainMenuTheme } from './_homepage';
import muteBtnImgSrc from '../assets/images/volume-off.svg';
import volumeOnBtnImgSrc from '../assets/images/volume-on.svg';
import themeBtnImgSrc from '../assets/images/theme.svg';

const root = document.documentElement;
const MAIN_COLOR = ' hsl(278, 51%, 59%)';
const BACKGROUND_COLOR = ' hsl(268, 62%, 46%)';
const SECONDARY_COLOR = ' hsl(263, 49%, 73%)';
const WHITE_COLOR = ' hsl(0, 0%, 96%)';
const ALT_MAIN_COLOR = ' #292929';
const ALT_BACKGROUND_COLOR = ' #1b1b1b';
const ALT_SECONDARY_COLOR = ' #ffa31a';
const ALT_WHITE_COLOR = ' #ffffff';

function changeVolumeBtnIcon(volumeBtn, volumeBtnImg) {
  if (volumeBtn.classList.contains('header-buttons__volume-btn--mute')) {
    volumeBtnImg.src = volumeOnBtnImgSrc;
    volumeBtn.classList.remove('header-buttons__volume-btn--mute');
    volumeBtn.classList.add('header-buttons__volume-btn--on');
    mainMenuTheme.muted = false;
    if (mainMenuTheme.paused) mainMenuTheme.play();
  } else {
    volumeBtnImg.src = muteBtnImgSrc;
    volumeBtn.classList.add('header-buttons__volume-btn--mute');
    volumeBtn.classList.remove('header-buttons__volume-btn--on');
    mainMenuTheme.muted = true;
  }
}

function createHeaderButtonsContainer() {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'header-buttons';
  const themeBtn = document.createElement('button');
  themeBtn.classList.add('header-buttons__theme-btn', 'hvr-grow-shadow');
  const themeBtnImg = new Image();
  themeBtnImg.classList.add('header-buttons-theme-btn-img');
  themeBtnImg.src = themeBtnImgSrc;
  themeBtn.append(themeBtnImg);
  themeBtn.addEventListener('click', () => {
    getComputedStyle(root).getPropertyValue('--main-color') === MAIN_COLOR 
      ? root.style.setProperty('--main-color', ALT_MAIN_COLOR) : root.style.setProperty('--main-color', MAIN_COLOR);
    getComputedStyle(root).getPropertyValue('--background-color') === BACKGROUND_COLOR
      ? root.style.setProperty('--background-color', ALT_BACKGROUND_COLOR) : root.style.setProperty('--background-color', BACKGROUND_COLOR);
    getComputedStyle(root).getPropertyValue('--secondary-color') === SECONDARY_COLOR
      ? root.style.setProperty('--secondary-color', ALT_SECONDARY_COLOR) : root.style.setProperty('--secondary-color', SECONDARY_COLOR);
    getComputedStyle(root).getPropertyValue('--white-smoke') === WHITE_COLOR
      ? root.style.setProperty('--white-smoke', ALT_WHITE_COLOR) : root.style.setProperty('--white-smoke', WHITE_COLOR);
  });
  buttonsContainer.append(themeBtn);
  const volumeBtn = document.createElement('button');
  volumeBtn.classList.add('header-buttons__volume-btn', 'hvr-grow-shadow', 'header-buttons__volume-btn--mute');
  const volumeBtnImg = new Image();
  volumeBtnImg.classList.add('header-buttons__volume-btn-img');
  volumeBtnImg.src = muteBtnImgSrc;
  volumeBtn.append(volumeBtnImg);
  volumeBtn.addEventListener('click', () => {
    changeVolumeBtnIcon(volumeBtn, volumeBtnImg);
  });
  buttonsContainer.append(volumeBtn);
  const homeBtn = document.createElement('button');
  homeBtn.classList.add('header-buttons__home-btn', 'header-buttons__home-btn--inactive');
  const homeBtnImg = new Image();
  homeBtnImg.src = homeBtnImage;
  homeBtn.append(homeBtnImg);
  homeBtn.addEventListener('click', () => {
    goToHomePage();
    homeBtn.classList.add('header-buttons__home-btn--inactive');
    homeBtn.classList.remove('hvr-grow-shadow');
    homeBtn.disabled = true;
  });
  homeBtn.disabled = true;
  buttonsContainer.append(homeBtn);

  return buttonsContainer;
}

function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  const logo = new Image();
  logo.src = logoImage;
  header.append(logo);
  header.append(createHeaderButtonsContainer());

  return header;
}

export { createHeader, changeVolumeBtnIcon };
