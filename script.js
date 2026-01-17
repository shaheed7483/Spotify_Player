console.log("Player Loaded ✅");

const playlist = [
  { title: "What Economy", artist: " - SA", filePath: "songs/1.mp3",  coverPath: "covers/1.png"  },
  { title: "Aathma Raama", artist: " - Brodha V", filePath: "songs/2.mp3",  coverPath: "covers/2.png"  },
  { title: "Be Free", artist: " - Vidya Vox", filePath: "songs/3.mp3",  coverPath: "covers/3.png"  },
  { title: "FE!N", artist: " - Travis Scott", filePath: "songs/4.mp3",  coverPath: "covers/4.png"  },
  { title: "Hope", artist: " - XXXTENTACION", filePath: "songs/5.mp3",  coverPath: "covers/5.png"  },
  { title: "Lose Yourself", artist: " - Eminem", filePath: "songs/6.mp3",  coverPath: "covers/6.png"  },
  { title: "Smack That", artist: " - Akon", filePath: "songs/7.mp3",  coverPath: "covers/7.png"  },
  { title: "tv of", artist: " - Kendrick Lamar", filePath: "songs/8.mp3",  coverPath: "covers/8.png"  },
  { title: "a lot", artist: " - 21 Savage", filePath: "songs/9.mp3",  coverPath: "covers/9.jpg"  },
  { title: "From The Inside", artist: " - Linkin Park", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
  { title: "Everyday Normal Guy 2", artist: " - Jon Lajoie", filePath: "songs/11.mp3", coverPath: "covers/11.jpg" },
  { title: "God's Plan", artist: " - Drake", filePath: "songs/12.mp3", coverPath: "covers/12.jpg" },
  { title: "Roses", artist: " - SAINt JHN", filePath: "songs/13.mp3", coverPath: "covers/13.jpg" },
  { title: "Unforgettable", artist: " - French Montana", filePath: "songs/14.mp3", coverPath: "covers/14.jpg" },
];

let songIndex = 0;
let audio = new Audio(playlist[songIndex].filePath);

const trackList = document.getElementById("trackList");
const coverImage = document.getElementById("coverImage");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// ✅ Render playlist
playlist.forEach((song, i) => {
  const li = document.createElement("li");
  li.classList.add("track");
  li.innerHTML = `
    <img src="${song.coverPath}" alt="cover">
    <div>
      <span class="title">${song.title}</span>
      <span class="artist">${song.artist}</span>
    </div>
  `;
  li.addEventListener("click", () => loadSong(i, true));
  trackList.appendChild(li);
});

function loadSong(index, play = false) {
  songIndex = index;
  audio.src = playlist[songIndex].filePath;
  coverImage.src = playlist[songIndex].coverPath;

  document.querySelectorAll(".track").forEach((el, i) => {
    el.classList.toggle("active", i === songIndex);
  });

  if (play) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    playPauseBtn.textContent = "▶️";
  }
}

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
});

prevBtn.addEventListener("click", () => {
  loadSong((songIndex - 1 + playlist.length) % playlist.length, true);
});

nextBtn.addEventListener("click", () => {
  loadSong((songIndex + 1) % playlist.length, true);
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Automatically play next song when current ends
audio.addEventListener("ended", () => {
  loadSong((songIndex + 1) % playlist.length, true);
});

// Load first song
loadSong(0);
