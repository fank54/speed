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
  const url = document.getElementById('videoUrl').value.trim();
  const videoId = extractVideoID(url);
  if (videoId) {
    player.loadVideoById(videoId);
  } else {
    alert("❌ Please enter a valid YouTube link!");
  }
}

// Extract Video ID (Support Shorts, Normal Links, Share Links)
function extractVideoID(url) {
  try {
    // 1. Try URL parsing
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Case 1: Normal YouTube link with ?v=VIDEOID
    if (parsedUrl.searchParams.get("v")) {
      return parsedUrl.searchParams.get("v");
    }

    // Case 2: Shorts link (youtube.com/shorts/VIDEOID)
    if (hostname.includes("youtube.com") && parsedUrl.pathname.startsWith("/shorts/")) {
      return parsedUrl.pathname.split("/shorts/")[1].split("?")[0];
    }

    // Case 3: youtu.be short link
    if (hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    return null;
  } catch (error) {
    console.error("Invalid URL", error);
    return null;
  }
}

// Set Playback Speed
function setSpeed(speed) {
  if (player && player.setPlaybackRate) {
    player.setPlaybackRate(speed);
  }
}
