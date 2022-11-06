/* eslint-disable no-param-reassign */
import logoImage from '../assets/images/logo.png';
import homeBtnImage from '../assets/images/home.svg';
import { goToHomePage, mainMenuTheme } from './_homepage';
import muteBtnImgSrc from '../assets/images/volume-off.svg';
import volumeOnBtnImgSrc from '../assets/images/volume-on.svg';

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
  homeBtn.classList.add('header-buttons__home-btn', 'hvr-grow-shadow');
  const homeBtnImg = new Image();
  homeBtnImg.src = homeBtnImage;
  homeBtn.append(homeBtnImg);
  homeBtn.onclick = goToHomePage;
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
