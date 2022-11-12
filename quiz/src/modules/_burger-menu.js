import {
  createLanguageBtn, createGalleryBtn, createHomeBtn, createVolumeBtn,
} from './_header';

function createBurgerMenu() {
  const menu = document.createElement('div');
  menu.classList.add('burger-menu', 'burger-menu--invisible');
  menu.append(createLanguageBtn());
  menu.append(createGalleryBtn());
  menu.append(createVolumeBtn());
  menu.append(createHomeBtn());
  return menu;
}

export default createBurgerMenu;
