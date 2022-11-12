/* eslint-disable no-param-reassign */
import logoImage from '../assets/images/logo.png';
import homeBtnImage from '../assets/images/home.svg';
import { goToHomePage, mainMenuTheme } from './_homepage';
import muteBtnImgSrc from '../assets/images/volume-off.svg';
import volumeOnBtnImgSrc from '../assets/images/volume-on.svg';
import galleryBtnImgSrc from '../assets/images/gallery.svg';
import { showGallery } from './_gallery';
import burgerBtnImgSrc from '../assets/images/menu.svg';
import burgerBtnOpenSrc from '../assets/images/menu-open.svg';
import createBurgerMenu from './_burger-menu';
import greatBritainImg from '../assets/images/great-britain.png';
import russiaImg from '../assets/images/russia.png';
import changeLanguage from './_change-language';

let language;
if (localStorage.language === undefined) language = 'en';
else language = localStorage.language;

function createLanguageBtn(isHeader) {
  const languageBtn = document.createElement('button');
  if (isHeader) languageBtn.classList.add('header-buttons__language-btn', 'hvr-grow-shadow', 'en');
  else languageBtn.classList.add('burger-buttons__language-btn', 'en');
  const languageBtnImg = new Image();
  if (language === 'en') languageBtnImg.src = greatBritainImg;
  else languageBtnImg.src = russiaImg;
  languageBtn.append(languageBtnImg);
  languageBtn.addEventListener('click', () => {
    language = changeLanguage(language);
    localStorage.setItem('language', language);
    window.location.reload();
  });
  return languageBtn;
}

function createGalleryBtn(isHeader) {
  const galleryBtn = document.createElement('button');
  if (isHeader) galleryBtn.classList.add('header-buttons__gallery-btn', 'hvr-grow-shadow');
  else galleryBtn.classList.add('burger-buttons__gallery-btn');
  const galleryBtnImg = new Image();
  galleryBtnImg.src = galleryBtnImgSrc;
  galleryBtn.append(galleryBtnImg);
  galleryBtn.onclick = showGallery;
  return galleryBtn;
}

function changeVolumeBtnIcon(volumeBtn, volumeBtnImg) {
  if (volumeBtn.classList.contains('header-buttons__volume-btn--mute')) {
    volumeBtnImg.src = volumeOnBtnImgSrc;
    volumeBtn.classList.remove('header-buttons__volume-btn--mute');
    volumeBtn.classList.add('header-buttons__volume-btn--on');
    mainMenuTheme.muted = false;
    if (mainMenuTheme.paused) mainMenuTheme.play();
  } else if (volumeBtn.classList.contains('header-buttons__volume-btn--on')) {
    volumeBtnImg.src = muteBtnImgSrc;
    volumeBtn.classList.add('header-buttons__volume-btn--mute');
    volumeBtn.classList.remove('header-buttons__volume-btn--on');
    mainMenuTheme.muted = true;
  } else if (volumeBtn.classList.contains('burger-buttons__volume-btn--mute')) {
    volumeBtnImg.src = volumeOnBtnImgSrc;
    volumeBtn.classList.remove('burger-buttons__volume-btn--mute');
    volumeBtn.classList.add('burger-buttons__volume-btn--on');
    mainMenuTheme.muted = false;
    if (mainMenuTheme.paused) mainMenuTheme.play();
  } else {
    volumeBtnImg.src = muteBtnImgSrc;
    volumeBtn.classList.add('burger-buttons__volume-btn--mute');
    volumeBtn.classList.remove('burger-buttons__volume-btn--on');
    mainMenuTheme.muted = true;
  }
}

function createVolumeBtn(isHeader) {
  const volumeBtn = document.createElement('button');
  if (isHeader) volumeBtn.classList.add('header-buttons__volume-btn', 'hvr-grow-shadow', 'header-buttons__volume-btn--mute');
  else volumeBtn.classList.add('burger-buttons__volume-btn', 'burger-buttons__volume-btn--mute');
  const volumeBtnImg = new Image();
  if (isHeader) volumeBtnImg.classList.add('header-buttons__volume-btn-img');
  else volumeBtnImg.classList.add('burger-buttons__volume-btn-img');
  volumeBtnImg.src = muteBtnImgSrc;
  volumeBtn.append(volumeBtnImg);
  volumeBtn.addEventListener('click', () => {
    changeVolumeBtnIcon(volumeBtn, volumeBtnImg);
  });
  return volumeBtn;
}

function createHomeBtn(isHeader) {
  const homeBtn = document.createElement('button');
  if (isHeader) homeBtn.classList.add('header-buttons__home-btn', 'header-buttons__home-btn--inactive');
  else homeBtn.classList.add('burger-buttons__home-btn', 'burger-buttons__home-btn--inactive');
  const homeBtnImg = new Image();
  homeBtnImg.src = homeBtnImage;
  homeBtn.append(homeBtnImg);
  homeBtn.addEventListener('click', (event) => {
    if (event.target.classList.contains('header-buttons__home-btn') || event.target.parentNode.classList.contains('header-buttons__home-btn')) goToHomePage(true);
    else goToHomePage();
    if (isHeader) homeBtn.classList.add('header-buttons__home-btn--inactive');
    else homeBtn.classList.add('burger-buttons__home-btn--inactive');
    homeBtn.classList.remove('hvr-grow-shadow');
    homeBtn.disabled = true;
  });
  homeBtn.disabled = true;
  return homeBtn;
}

function createBurgerBtn() {
  const menu = createBurgerMenu();
  document.body.prepend(menu);
  const burgerBtn = document.createElement('button');
  burgerBtn.classList.add('header-buttons__burger-btn');
  const burgerBtnImg = new Image();
  burgerBtnImg.src = burgerBtnImgSrc;
  burgerBtn.append(burgerBtnImg);
  burgerBtn.addEventListener('click', () => {
    if (burgerBtnImg.src === burgerBtnImgSrc) {
      burgerBtnImg.src = burgerBtnOpenSrc;
      menu.classList.remove('burger-menu--invisible');
    } else {
      burgerBtnImg.src = burgerBtnImgSrc;
      menu.classList.add('burger-menu--invisible');
    }
  });
  return burgerBtn;
}

function createHeaderButtonsContainer() {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'header-buttons';
  const languageBtn = createLanguageBtn(true);
  buttonsContainer.append(languageBtn);
  const galleryBtn = createGalleryBtn(true);
  buttonsContainer.append(galleryBtn);
  const volumeBtn = createVolumeBtn(true);
  buttonsContainer.append(volumeBtn);
  const homeBtn = createHomeBtn(true);
  buttonsContainer.append(homeBtn);
  const burgerBtn = createBurgerBtn();
  buttonsContainer.append(burgerBtn);

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

export {
  createHeader, createLanguageBtn, createGalleryBtn, createHomeBtn, createVolumeBtn,
  changeVolumeBtnIcon,
};
