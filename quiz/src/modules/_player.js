/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
import volumeBtnImgSrc from '../assets/images/volume-on.svg';
import { mainMenuTheme } from './_homepage';
import { answerSong, questionSong } from './_quizpage';

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num, 10);
  let minutes = parseInt(seconds / 60, 10);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60, 10);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function createPlayer(game, audio) {
  if (!mainMenuTheme.paused) mainMenuTheme.pause();
  const player = document.createElement('div');
  player.className = 'player';
  audio.src = game.audio;
  // таймлайн
  const timeline = document.createElement('div');
  timeline.className = 'timeline';
  const progress = document.createElement('div');
  progress.className = 'progress';
  timeline.append(progress);
  player.append(timeline);
  // элементы управления
  const controls = document.createElement('div');
  controls.className = 'controls';
  const playContainer = document.createElement('div');
  playContainer.className = 'play-container';
  // кнопка play/pause
  const togglePlay = document.createElement('div');
  togglePlay.classList.add('toggle-play', 'play');
  playContainer.append(togglePlay);
  controls.append(playContainer);
  // время трека
  const time = document.createElement('div');
  time.className = 'time';
  const current = document.createElement('div');
  current.className = 'current';
  time.append(current);
  const divider = document.createElement('div');
  divider.className = 'divider';
  divider.innerText = '/';
  time.append(divider);
  const length = document.createElement('div');
  length.className = 'length';
  time.append(length);
  controls.append(time);
  // управление громкостью
  const volumeBtn = document.createElement('button');
  volumeBtn.className = 'volume-button';
  volumeBtn.style.backgroundImage = `url(${volumeBtnImgSrc})`;
  controls.append(volumeBtn);
  const volumeSlider = document.createElement('div');
  volumeSlider.classList.add('volume-slider', 'volume-slider--invisible');
  const volumePercentage = document.createElement('div');
  volumePercentage.className = 'volume-percentage';
  volumeSlider.append(volumePercentage);
  volumeBtn.before(volumeSlider);
  volumeBtn.addEventListener('click', () => {
    if (volumeSlider.classList.contains('volume-slider--invisible')) volumeSlider.classList.remove('volume-slider--invisible');
    else volumeSlider.classList.add('volume-slider--invisible');
  });
  player.append(controls);

  audio.addEventListener('loadeddata', () => {
    length.textContent = getTimeCodeFromNum(
      audio.duration,
    );
    audio.volume = 0.75;
  }, false);

  // переключение между паузой и воспроизведением
  togglePlay.addEventListener('click', () => {
    if (audio.paused) {
      togglePlay.classList.remove('play');
      togglePlay.classList.add('pause');
      audio.play();
      if (audio === answerSong) {
        questionSong.pause();
        const questionTogglePlay = document.querySelectorAll('.toggle-play')[0];
        questionTogglePlay.classList.remove('pause');
        questionTogglePlay.classList.add('play');
      } else if (audio === questionSong) {
        answerSong.pause();
        const answerTogglePlay = document.querySelectorAll('.toggle-play')[1];
        try {
          answerTogglePlay.classList.remove('pause');
          answerTogglePlay.classList.add('play');
        } catch (err) {
          //
        }
      }
    } else {
      togglePlay.classList.remove('pause');
      togglePlay.classList.add('play');
      audio.pause();
    }
  }, false);

  // клик по таймлайну перематывает трек
  timeline.addEventListener('click', (event) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = event.offsetX / parseInt(timelineWidth, 10) * audio.duration;
    audio.currentTime = timeToSeek;
  }, false);

  // клик по слайдеру звука
  volumeSlider.addEventListener('click', (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth, 10);
    audio.volume = newVolume;
    volumePercentage.style.width = `${newVolume * 100}%`;
  }, false);

  return player;
}

function updateSongStatus(audio, isAnswerSong) {
  let progress;
  let current;
  let togglePlay;
  if (!isAnswerSong) {
    progress = document.querySelectorAll('.progress')[0];
    current = document.querySelectorAll('.current')[0];
    togglePlay = document.querySelectorAll('.toggle-play')[0];
  } else {
    progress = document.querySelectorAll('.progress')[1];
    current = document.querySelectorAll('.current')[1];
    togglePlay = document.querySelectorAll('.toggle-play')[1];
  }
  progress.style.width = `${audio.currentTime / audio.duration * 100}%`;
  current.textContent = getTimeCodeFromNum(
    audio.currentTime,
  );
  audio.onended = () => {
    togglePlay.classList.remove('pause');
    togglePlay.classList.add('play');
    progress.style.width = '0';
  };
}

export { createPlayer, updateSongStatus, getTimeCodeFromNum };
