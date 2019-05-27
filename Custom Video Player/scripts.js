// Get our Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const screenSize = player.querySelector('.screen_size');

// Build our Functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon; 
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value; 
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; 
  video.currentTime = scrubTime;
}

function checkKey(e) {
  if (e.keyCode === 32) {
    togglePlay();
  }
  if (e.keyCode === 37) {
    video.currentTime -= 10
  }
  if (e.keyCode === 39) {
    video.currentTime += 10
  }
  if (e.keyCode === 27) {
    closeFullscreen();
  }
}

function toggleScreenSize() {
  if (document.webkitIsFullScreen) {
    closeFullscreen()
  } else {
    openFullscreen();
  }
}

function openFullscreen() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
document.addEventListener('keyup', checkKey);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//screen size
screenSize.addEventListener('click', toggleScreenSize);