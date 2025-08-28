let player;

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '',
    playerVars: {
      playsinline: 1
    }
  });
}

// Load Video from URL
function loadVideo() {
  const url = document.getElementById('videoUrl').value.trim();
  const videoId = extractVideoID(url);
  console.log("Extracted Video ID:", videoId);

  if (videoId) {
    player.loadVideoById(videoId);
  } else {
    alert("❌ Invalid YouTube link! Please try again.");
  }
}

// Function to Extract YouTube Video ID
function extractVideoID(url) {
  try {
    // Clean URL
    url = url.replace("youtu.be/", "youtube.com/watch?v=");
    url = url.replace("shorts/", "watch?v=");

    const parsedUrl = new URL(url);

    // Get Video ID from search params
    if (parsedUrl.searchParams.has("v")) {
      return parsedUrl.searchParams.get("v");
    }

    // If path contains video ID
    const pathParts = parsedUrl.pathname.split('/');
    for (const part of pathParts) {
      if (part.length === 11) return part;
    }

    return null;
  } catch (e) {
    console.error("Error parsing URL:", e);
    return null;
  }
}

// Set Playback Speed
function setSpeed(speed) {
  if (player && player.setPlaybackRate) {
    player.setPlaybackRate(speed);
  }
}
