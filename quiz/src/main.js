import './index.html';
import './styles/styles.scss';
import backgroundImage from './assets/images/background.webp';
import { createHeader } from './modules/_header';
import { createMain } from './modules/_homepage';
import createFooter from './modules/_footer';
import { checkState } from './modules/_quizpage';

function createStartingPage() {
  document.body.style.backgroundImage = `url(${backgroundImage})`;
  document.body.className = 'body';

  const header = createHeader();
  document.body.append(header);

  const main = createMain();
  document.body.append(main);

  const footer = createFooter();
  document.body.append(footer);
}
window.addEventListener('load', () => {
  createStartingPage();
  checkState();
});
