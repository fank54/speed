let player;

// Load YouTube Iframe API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '',
    events: {}
  });
}

// Load Video from Input
function loadVideo() {
  const url = document.getElementById('videoUrl').value;
  const videoId = extractVideoID(url);
  if (videoId) {
    player.loadVideoById(videoId);
  } else {
    alert("Please enter a valid YouTube link!");
  }
}

// Extract Video ID
function extractVideoID(url) {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Set Playback Speed
function setSpeed(speed) {
  if (player && player.setPlaybackRate) {
    player.setPlaybackRate(speed);
  }
}
