import logoImage from '../assets/images/logo.png';
import homeBtnImage from '../assets/images/home.svg';
import { goToHomePage } from './_homepage';

function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  const logo = new Image();
  logo.src = logoImage;
  header.append(logo);
  const homeBtn = document.createElement('button');
  homeBtn.className = 'header__home-btn';
  const homeBtnImg = new Image();
  homeBtnImg.src = homeBtnImage;
  homeBtn.append(homeBtnImg);
  homeBtn.onclick = goToHomePage;
  header.append(homeBtn);

  return header;
}

export default createHeader;
