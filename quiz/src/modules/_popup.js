import { replaceBoard } from './_quizpage';
import { goToHomePage } from './_homepage';
import winSound from '../assets/audio/win.mp3';
import lossSound from '../assets/audio/loss.mp3';

const winMusic = new Audio();
winMusic.src = winSound;
const lossMusic = new Audio();
lossMusic.src = lossSound;
const maxScores = 30;

function createPopup() {
  const scoreNum = document.querySelector('.score__num');
  // создаем прослойку между боди и попапом
  const interlayer = document.createElement('div');
  interlayer.className = 'interlayer';
  document.body.prepend(interlayer);
  // создаем попап
  const popup = document.createElement('div');
  popup.className = 'popup';
  const heading = document.createElement('h3');
  heading.className = 'popup__heading';
  const message = document.createElement('p');
  message.className = 'popup__message';
  const buttons = document.createElement('div');
  buttons.className = 'endgame-buttons';
  const yesBtn = document.createElement('button');
  yesBtn.innerHTML = 'Yes';
  yesBtn.className = 'endgame-buttons__confirm';
  yesBtn.classList.add('hvr-wobble-vertical');
  yesBtn.addEventListener('click', () => {
    scoreNum.innerHTML = 0;
    replaceBoard(true);
    document.body.classList.remove('body--unscrollable');
    interlayer.remove();
    popup.remove();
  });
  const noBtn = document.createElement('button');
  noBtn.innerHTML = 'No';
  noBtn.className = 'endgame-buttons__decline';
  noBtn.classList.add('hvr-wobble-horizontal');
  noBtn.onclick = () => {
    goToHomePage();
    document.body.classList.remove('body--unscrollable');
    interlayer.remove();
    popup.remove();
  };
  buttons.appendChild(yesBtn);
  buttons.appendChild(noBtn);
  popup.append(heading);
  popup.append(message);
  if (parseInt(scoreNum.innerHTML, 10) === maxScores) {
    popup.classList.add('animate__animated', 'animate__tada');
    heading.innerHTML = 'Congratulations!';
    // eslint-disable-next-line no-multi-str
    message.innerHTML = 'You have scored maximum of 30 points.\n\
    GAME OVER.';
    winMusic.play();
  } else {
    popup.classList.add('animate__animated', 'animate__bounceIn');
    heading.innerHTML = 'Oops...You have lost :(';
    message.innerHTML = `You have scored ${scoreNum.innerHTML} points.\n\
    To win the game, you need to get 30 points. Want to try again?`;
    popup.append(buttons);
    lossMusic.play();
  }
  interlayer.after(popup);

  document.body.classList.add('body--unscrollable');
}

export default createPopup;
