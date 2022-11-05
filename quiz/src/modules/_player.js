/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
let timerId; // таймер внутри плеера;

function createPlayer(game) {
  const player = document.createElement('div');
  player.className = 'player';
  const audio = new Audio();
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
  time.append(divider);
  const length = document.createElement('div');
  length.className = 'length';
  time.append(length);
  controls.append(time);
  // управление громкостью
  const volumeContainer = document.createElement('div');
  volumeContainer.className = 'volume-container';
  const volumeBtn = document.createElement('div');
  volumeBtn.className = 'volume-button';
  const volumeIcon = document.createElement('div');
  volumeIcon.classList.add('volume', 'icono-volumeMedium');
  volumeBtn.append(volumeIcon);
  volumeContainer.append(volumeBtn);
  const volumeSlider = document.createElement('div');
  volumeSlider.className = 'volume-slider';
  const volumePercentage = document.createElement('div');
  volumePercentage.className = 'volume-percentage';
  volumeSlider.append(volumePercentage);
  volumeContainer.append(volumeSlider);
  controls.append(volumeContainer);
  player.append(controls);

  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num, 10);
    let minutes = parseInt(seconds / 60, 10);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60, 10);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }

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
    } else {
      togglePlay.classList.remove('pause');
      togglePlay.classList.add('play');
      audio.pause();
    }
  }, false);

  // click on timeline to skip around
  timeline.addEventListener('click', (event) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = event.offsetX / parseInt(timelineWidth, 10) * audio.duration;
    audio.currentTime = timeToSeek;
  }, false);

  // click volume slider to change volume;
  volumeSlider.addEventListener('click', (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth, 10);
    audio.volume = newVolume;
    volumePercentage.style.width = `${newVolume * 100}%`;
  }, false);

  // check audio percentage and update time accordingly
  timerId = setInterval(() => {
    progress.style.width = `${audio.currentTime / audio.duration * 100}%`;
    current.textContent = getTimeCodeFromNum(
      audio.currentTime,
    );
    if (audio.duration === audio.currentTime) {
      togglePlay.classList.remove('pause');
      togglePlay.classList.add('play');
    }
    /* if (isHomePage || isAnswered) { // TODO: добавить переключение на другой вопрос
      audio.pause(); // TODO: зафиксить баг с тем, что трек всегда встает на паузу
      clearInterval(timerId);
    } */
  }, 1000);

  return player;
}

export default createPlayer;
