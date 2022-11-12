import closeBtnImgSrc from '../assets/images/close.svg';
import gamesData from '../gamesData';
import { mainMenuTheme } from './_homepage';
import { createPlayer } from './_player';

let language;
if (localStorage.language === undefined) language = 'en';
else language = localStorage.language;

const categories = [];
gamesData.forEach((elem) => {
  if (!categories.includes(elem[language].category)) categories.push(elem[language].category);
});
const descriptionSong = new Audio();

function createListOfGames(category) {
  const gamesSection = document.querySelector('.games-section');
  gamesSection.innerHTML = '';
  const gamesArr = gamesData.filter((elem) => elem[language].category === category);
  for (let i = 0; i < gamesArr.length; i += 1) {
    const gameCard = document.createElement('div');
    const cover = new Image();
    cover.src = gamesArr[i].cover;
    gameCard.append(cover);
    gameCard.classList.add('game-card');
    gamesSection.append(gameCard);
  }
  gamesSection.onclick = (event) => {
    const gameData = gamesData.find((elem) => elem.cover === event.target.src);
    if (event.target.tagName === 'IMG') {
      // создаем промежуточный слой
      const interlayer = document.createElement('div');
      interlayer.className = 'gallery__interlayer';
      document.querySelector('.gallery').prepend(interlayer);
      // создаем карточку с описанием игры
      const descriptionCard = document.createElement('div');
      descriptionCard.classList.add('game-card__description');
      document.querySelector('.gallery').prepend(descriptionCard);
      const heading = document.createElement('h3');
      heading.textContent = gameData[language].name;
      descriptionCard.append(heading);
      const text = document.createElement('p');
      text.innerText = gameData[language].description;
      descriptionCard.append(text);
      const link = document.createElement('a');
      link.className = 'game-card__link';
      link.href = gameData[language].link;
      link.target = '_blank';
      const moreInfoText = document.createElement('p');
      if (language === 'en') moreInfoText.textContent = 'Read more...';
      else moreInfoText.textContent = 'Узнать больше...';
      link.append(moreInfoText);
      descriptionCard.append(link);
      const player = createPlayer(gameData, descriptionSong);
      descriptionCard.append(player);
      // на клик вне карточки с описанием она закрывается и прерывается музыка если играла
      interlayer.addEventListener('click', () => {
        descriptionCard.remove();
        interlayer.remove();
        descriptionSong.src = '';
        if (mainMenuTheme.paused) mainMenuTheme.play();
      });
    }
  };
}

function createCategories() {
  const categoriesSection = document.createElement('div');
  categoriesSection.className = 'categories-section';
  const list = document.createElement('ul');
  list.className = 'categories-list';
  for (let i = 0; i < categories.length; i += 1) {
    const category = document.createElement('li');
    category.className = 'categories-list__item';
    category.textContent = categories[i];
    list.append(category);
  }
  list.addEventListener('click', (event) => {
    document.querySelectorAll('.categories-list__item--active').forEach((elem) => elem.classList.remove('categories-list__item--active'));
    if (event.target.tagName === 'LI') event.target.classList.add('categories-list__item--active');
    const currentCategory = event.target.textContent;
    createListOfGames(currentCategory);
  });
  categoriesSection.append(list);
  return categoriesSection;
}

function createGalleryFrame() {
  const frame = document.createElement('div');
  frame.className = 'frame';
  // создаем секцию с категориями
  const categoriesSection = createCategories();
  frame.append(categoriesSection);
  // создаем секцию с играми
  const games = document.createElement('div');
  games.className = 'games-section';
  frame.append(games);
  return frame;
}

function showGallery() {
  const gallery = document.createElement('div');
  gallery.className = 'gallery';
  // создаем кнопку для выхода из галереи
  const closeBtn = document.createElement('button');
  closeBtn.className = 'gallery__close-btn';
  closeBtn.style.backgroundImage = `url(${closeBtnImgSrc})`;
  closeBtn.addEventListener('click', () => {
    gallery.remove();
  });
  gallery.append(closeBtn);
  // создаем заголовок
  const heading = document.createElement('h3');
  heading.className = 'gallery__heading';
  if (language === 'en') heading.textContent = 'Gallery';
  else heading.textContent = 'Галерея';
  gallery.append(heading);
  // создаем рамку галлереи
  gallery.append(createGalleryFrame());
  document.body.prepend(gallery);
}

export { showGallery, descriptionSong };
