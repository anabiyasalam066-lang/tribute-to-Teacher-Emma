"use strict";

// Personalize these memory, chapter, and letter texts before sharing the keepsake.
const memories = [
  { icon: "♡", title: "The dedication behind each day", message: "A lesson begins before the classroom fills: in the thought, time, and care it takes to prepare for someone else's learning. That dedication may be quiet, but it can make a lasting difference." },
  { icon: "✧", title: "The patience to try again", message: "Learning rarely happens in one perfect step. It takes patience to explain something another way, welcome another question, and give someone room to try again. That patience is its own kind of kindness." },
  { icon: "❀", title: "What we carry", message: "A school day passes, then another. Yet a few ordinary moments find a home in memory. Years later, they can still feel warm—not because they were grand, but because someone made them matter." },
  { icon: "☆", title: "Words left unsaid", message: "Perhaps there were times a student wanted to say thank you and could not quite find the words. Please let this little world say it now: your care was noticed, and it is remembered with gratitude." },
  { icon: "☼", title: "The ordinary, made golden", message: "Laughter, familiar routines, and the little in-between moments can become the brightest parts of looking back. Maybe that is one kind of magic: discovering, later on, how lovely an ordinary day was." },
  { icon: "❧", title: "Four years of growing", message: "Four years hold many seasons of learning and becoming. This is not a list of grand events, but a quiet thank-you for being there through a stretch of life that helped shape the person your student is still growing into." },
  { icon: "∞", title: "A difficult thank-you", message: "It is hard to fit four years of appreciation into a few sentences. So here is the truest start: thank you for the time, the patience, and the care you shared. They mattered more than these words can measure." },
  { icon: "♡", title: "A wish for what comes next", message: "As a beautiful new chapter opens for you, may it bring gentle mornings, shared laughter, a steady hand through every season, and a love that keeps finding new ways to feel like home." }
];

const chapters = [
  { heading: "The Beginning", image: "assets/images/student-memory-01.svg", kicker: "Chapter one · The beginning", title: "Every beginning holds a little wonder.", text: "A new classroom, new things to learn, and the first small steps of a story that would unfold over time. You were there at the beginning of this chapter, making room for curiosity to grow." },
  { heading: "The Lessons", image: "assets/images/student-memory-05.svg", kicker: "Chapter two · The lessons", title: "Learning happens one question at a time.", text: "Learning is made of many tries: questions asked, ideas discovered, and moments when something finally makes sense. Thank you for helping make space for all those ways of growing." },
  { heading: "The Memories", image: "assets/images/student-memory-07.svg", kicker: "Chapter three · The memories", title: "Some ordinary days turn golden.", text: "Not every treasured memory announces itself. Some are made of everyday laughter, familiar routines, and the comfort of being encouraged to keep going. We carry those small lights with us." },
  { heading: "The Gratitude", image: "assets/images/student-memory-04.svg", kicker: "Chapter four · The gratitude", title: "A chapter ends; its kindness travels on.", text: "Four years cannot be summed up by a page or a date. They leave behind lessons, affection, and gratitude—things that can accompany a student long after the school day is over." }
];

const letterParagraphs = [
  "Dear Teacher Emma,",
  "I have been trying to find words large enough to hold four years of gratitude, and I keep discovering that the truest things are often the simplest: I am glad I had you as my teacher.",
  "You may not know which small moments stayed with me. A patient explanation, a kind word, or simply the feeling that I could try again may have seemed like an ordinary part of your day. To a student, those moments can become something to carry for years. They become part of how we remember learning—and part of how we learn to believe in ourselves.",
  "Teaching is more than the subjects written on a board. It is the care woven into the way a person teaches, and the encouragement that reaches further than the classroom. I will always be grateful for the part you played in my story.",
  "Now a beautiful new chapter is beginning for you. I hope it brings you tenderness in the hard moments, laughter in the everyday ones, and the kind of love that makes a home feel brighter. We can celebrate your happiness and still hold our memories of you close; there is room in the heart for both.",
  "Thank you for these four years, and for all the little things that made them matter. I wish you every happiness in the life you are building together.",
  "With love and gratitude,\nOne of your students"
];

const intro = document.querySelector("#intro");
const experience = document.querySelector("#experience");
const unlockButton = document.querySelector("#unlock-button");
const memoryGrid = document.querySelector("#memory-grid");
const memoryDialog = document.querySelector("#memory-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogKicker = document.querySelector("#dialog-kicker");
const dialogMessage = document.querySelector("#dialog-message");
const discoverAnother = document.querySelector("#discover-another");
const chapterPages = document.querySelector("#chapter-pages");
const chapterKicker = document.querySelector("#chapter-kicker");
const chapterHeading = document.querySelector("#chapter-heading");
const chapterCopy = document.querySelector("#chapter-copy");
const letterButton = document.querySelector("#letter-open");
const letterPaper = document.querySelector("#letter-paper");
const letterCopy = document.querySelector("#letter-copy");
const letterSkip = document.querySelector("#letter-skip");
const continueButton = document.querySelector("#continue-to-wedding");
const weddingSection = document.querySelector("#wedding");
const surpriseButton = document.querySelector("#surprise-button");
const finalSurprise = document.querySelector("#final-surprise");
const secretStar = document.querySelector("#secret-star");
const secretMessage = document.querySelector("#secret-message");
const musicToggle = document.querySelector("#music-toggle");
const musicMute = document.querySelector("#music-mute");
const musicLabel = document.querySelector(".music-label");
const musicVolume = document.querySelector("#music-volume");
const audioStatus = document.querySelector("#audio-status");
const lightboxDialog = document.querySelector("#lightbox-dialog");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let currentMemoryIndex = 0;
let typingTimer = null;
let audioContext = null;
let musicGain = null;
let musicTimer = null;
let musicPlaying = false;
let musicMuted = false;
let noteIndex = 0;
let musicVolumeValue = Number(musicVolume.value) / 100;
let filmIndex = 0;
let filmTimer = null;
let lyricIndex = -1;
let lyricTimer = null;

memories.forEach((memory, index) => {
  const button = document.createElement("button");
  button.className = "memory-card";
  button.type = "button";
  button.dataset.memoryIndex = String(index);
  button.setAttribute("aria-label", `Open memory ${index + 1}: ${memory.title}`);
  button.innerHTML = `<span class="memory-number">MEMORY ${String(index + 1).padStart(2, "0")}</span><span class="memory-icon" aria-hidden="true">${memory.icon}</span><strong>${memory.title}</strong><span class="memory-open" aria-hidden="true">↗</span>`;
  button.addEventListener("click", () => openMemory(index));
  memoryGrid.append(button);
});

chapters.forEach((chapter, index) => {
  const button = document.createElement("button");
  button.className = "chapter-page";
  button.type = "button";
  button.setAttribute("aria-pressed", "false");
  button.innerHTML = `<img class="chapter-illustration" src="${chapter.image}" alt=""><span class="chapter-index">Page ${String(index + 1).padStart(2, "0")}</span><span class="chapter-name">${chapter.heading}</span><span>Open page ↗</span>`;
  button.addEventListener("click", () => {
    chapterPages.querySelectorAll(".chapter-page").forEach((page) => page.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    chapterKicker.textContent = chapter.kicker;
    chapterHeading.textContent = chapter.title;
    chapterCopy.textContent = chapter.text;
  });
  chapterPages.append(button);
});

function openMemory(index) {
  currentMemoryIndex = index;
  const memory = memories[index];
  memoryDialog.className = `memory-dialog reveal-${index}`;
  dialogKicker.textContent = `A little thing to remember · ${String(index + 1).padStart(2, "0")}`;
  dialogTitle.textContent = memory.title;
  dialogMessage.textContent = memory.message;
  if (!memoryDialog.open) memoryDialog.showModal();
}

discoverAnother.addEventListener("click", () => {
  openMemory((currentMemoryIndex + 1) % memories.length);
});

const filmFrames = [...document.querySelectorAll(".film-frame")];
const filmCount = document.querySelector("#film-count");

function showFilmFrame(index) {
  filmIndex = (index + filmFrames.length) % filmFrames.length;
  filmFrames.forEach((frame, frameIndex) => frame.classList.toggle("is-current", frameIndex === filmIndex));
  filmCount.textContent = `${String(filmIndex + 1).padStart(2, "0")} / ${String(filmFrames.length).padStart(2, "0")}`;
}

document.querySelector("#film-prev").addEventListener("click", () => showFilmFrame(filmIndex - 1));
document.querySelector("#film-next").addEventListener("click", () => showFilmFrame(filmIndex + 1));

const filmObserver = new IntersectionObserver(([entry]) => {
  window.clearInterval(filmTimer);
  if (entry.isIntersecting && !reducedMotion) {
    filmTimer = window.setInterval(() => showFilmFrame(filmIndex + 1), 6500);
  }
}, { threshold: 0.3 });
filmObserver.observe(document.querySelector("#film-reel"));
function syncFilmPlayback() {
  const reel = document.querySelector("#film-reel");
  const bounds = reel.getBoundingClientRect();
  const visible = bounds.top < window.innerHeight * 0.8 && bounds.bottom > window.innerHeight * 0.2;
  if (visible && !reducedMotion && !filmTimer) {
    filmTimer = window.setInterval(() => showFilmFrame(filmIndex + 1), 6500);
  } else if (!visible && filmTimer) {
    window.clearInterval(filmTimer);
    filmTimer = null;
  }
}
window.addEventListener("scroll", syncFilmPlayback, { passive: true });
document.querySelector("#film-reel").addEventListener("pointermove", (event) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = Math.round(((event.clientX - bounds.left) / bounds.width) * 100);
  const y = Math.round(((event.clientY - bounds.top) / bounds.height) * 100);
  const currentImage = event.currentTarget.querySelector(".film-frame.is-current img");
  if (currentImage) currentImage.style.objectPosition = `${x}% ${y}%`;
});

const abstractImageFallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 740'%3E%3Crect width='640' height='740' fill='%23322620'/%3E%3Ccircle cx='320' cy='320' r='150' fill='none' stroke='%23d7b477' stroke-width='3'/%3E%3Cpath d='M320 190v260M190 320h260' stroke='%23d7b477' stroke-width='3'/%3E%3C/svg%3E";
document.addEventListener("error", (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = "true";
  image.src = abstractImageFallback;
}, true);

const lyricLines = [...document.querySelectorAll(".lyric-line")];
let lyricsStarted = false;
function startLyricReveal() {
  if (lyricsStarted) return;
  lyricsStarted = true;
  lyricLines.forEach((line) => line.classList.remove("is-revealed", "is-current"));
  if (reducedMotion) {
    lyricLines.forEach((line) => line.classList.add("is-revealed"));
    return;
  }
  lyricIndex = -1;
  const revealNextLine = () => {
    lyricIndex += 1;
    if (lyricIndex >= lyricLines.length) {
      window.clearInterval(lyricTimer);
      return;
    }
    lyricLines.forEach((line, index) => {
      line.classList.toggle("is-current", index === lyricIndex);
      if (index <= lyricIndex) line.classList.add("is-revealed");
    });
  };
  revealNextLine();
  lyricTimer = window.setInterval(revealNextLine, 2300);
}
const songObserver = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) startLyricReveal();
}, { threshold: 0.45 });
songObserver.observe(document.querySelector("#song"));
function checkSongVisibility() {
  const bounds = document.querySelector("#song").getBoundingClientRect();
  if (bounds.top < window.innerHeight * 0.8 && bounds.bottom > window.innerHeight * 0.2) {
    startLyricReveal();
  }
}
window.addEventListener("scroll", checkSongVisibility, { passive: true });

unlockButton.addEventListener("click", () => {
  unlockButton.disabled = true;
  intro.classList.add("is-opening");
  window.setTimeout(() => {
    experience.hidden = false;
    startLyricReveal();
    intro.classList.add("is-gone");
    window.setTimeout(() => {
      intro.hidden = true;
      document.querySelector("#top").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }, reducedMotion ? 0 : 900);
  }, reducedMotion ? 0 : 1450);
});

document.querySelectorAll(".photo-card").forEach((card) => {
  card.addEventListener("click", () => {
    const image = card.dataset.image;
    const caption = card.dataset.caption;
    if (!image || !caption) return;
    lightboxImage.src = image;
    lightboxImage.alt = card.querySelector("img").alt;
    lightboxCaption.textContent = caption;
    lightboxDialog.showModal();
  });
});

lightboxDialog.addEventListener("close", () => lightboxImage.removeAttribute("src"));

letterButton.addEventListener("click", () => {
  letterButton.classList.add("is-open");
  letterButton.setAttribute("aria-expanded", "true");
  letterButton.setAttribute("aria-label", "The letter is open");
  letterPaper.hidden = false;
  if (reducedMotion) renderFullLetter();
  else typeLetter();
});

function typeLetter() {
  clearInterval(typingTimer);
  letterCopy.replaceChildren();
  continueButton.hidden = true;
  const fullText = letterParagraphs.join("\n\n");
  let position = 0;
  let paragraph = document.createElement("p");
  letterCopy.append(paragraph);
  typingTimer = window.setInterval(() => {
    if (position >= fullText.length) {
      finishLetter();
      return;
    }
    if (fullText[position] === "\n" && fullText[position + 1] === "\n") {
      paragraph = document.createElement("p");
      letterCopy.append(paragraph);
      position += 2;
      return;
    }
    paragraph.textContent += fullText[position];
    position += 1;
  }, 24);
}

function renderFullLetter() {
  clearInterval(typingTimer);
  letterCopy.replaceChildren();
  letterParagraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    letterCopy.append(paragraph);
  });
  finishLetter();
}

function finishLetter() {
  clearInterval(typingTimer);
  letterSkip.hidden = true;
  continueButton.hidden = false;
}

letterSkip.addEventListener("click", renderFullLetter);

continueButton.addEventListener("click", () => {
  weddingSection.hidden = false;
  weddingSection.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
});

surpriseButton.addEventListener("click", () => {
  finalSurprise.hidden = false;
  surpriseButton.hidden = true;
  finalSurprise.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
});

secretStar.addEventListener("click", () => {
  secretMessage.hidden = !secretMessage.hidden;
  secretStar.setAttribute("aria-expanded", String(!secretMessage.hidden));
});

const melody = [
  { note: 60, duration: 1.8 }, { note: 64, duration: 1.8 }, { note: 67, duration: 2.4 },
  { note: 71, duration: 1.8 }, { note: 67, duration: 1.8 }, { note: 64, duration: 2.4 },
  { note: 62, duration: 1.8 }, { note: 65, duration: 1.8 }, { note: 69, duration: 2.4 },
  { note: 67, duration: 1.8 }, { note: 64, duration: 1.8 }, { note: 60, duration: 2.4 }
];

async function startMusic() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) {
    audioStatus.textContent = "This browser does not support the original background music.";
    musicLabel.textContent = "Music unavailable";
    return;
  }
  try {
    if (!audioContext) {
      audioContext = new AudioContextConstructor();
      musicGain = audioContext.createGain();
      musicGain.gain.value = musicMuted ? 0 : musicVolumeValue;
      musicGain.connect(audioContext.destination);
    }
    if (audioContext.state === "suspended") await audioContext.resume();
    musicGain.gain.setTargetAtTime(musicMuted ? 0 : musicVolumeValue, audioContext.currentTime, 0.12);
    musicPlaying = true;
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.setAttribute("aria-label", "Pause original piano-like music");
    musicLabel.textContent = "Pause the music";
    musicMute.disabled = false;
    audioStatus.textContent = "Original piano-like music playing.";
    playNextNote();
  } catch (error) {
    musicPlaying = false;
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Music unavailable";
    audioStatus.textContent = "The original background music could not start in this browser.";
    console.error("Could not start the original background music.", error);
  }
}

function playNextNote() {
  if (!musicPlaying || !audioContext || !musicGain) return;
  const entry = melody[noteIndex % melody.length];
  noteIndex += 1;
  if (!musicMuted) {
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    const overtone = audioContext.createOscillator();
    const overtoneEnvelope = audioContext.createGain();
    const start = audioContext.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.value = 440 * (2 ** ((entry.note - 69) / 12));
    overtone.type = "triangle";
    overtone.frequency.value = oscillator.frequency.value * 2;
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(0.22, start + 0.035);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + entry.duration);
    overtoneEnvelope.gain.setValueAtTime(0.0001, start);
    overtoneEnvelope.gain.exponentialRampToValueAtTime(0.028, start + 0.025);
    overtoneEnvelope.gain.exponentialRampToValueAtTime(0.0001, start + 0.48);
    oscillator.connect(envelope);
    envelope.connect(musicGain);
    overtone.connect(overtoneEnvelope);
    overtoneEnvelope.connect(musicGain);
    oscillator.start(start);
    oscillator.stop(start + entry.duration + 0.04);
    overtone.start(start);
    overtone.stop(start + 0.52);
  }
  musicTimer = window.setTimeout(playNextNote, entry.duration * 1000 + 420);
}

musicToggle.addEventListener("click", async () => {
  if (musicPlaying) {
    musicPlaying = false;
    window.clearTimeout(musicTimer);
    if (musicGain && audioContext) {
      musicGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.08);
    }
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Play original piano-like music");
    musicLabel.textContent = "Play the music";
    audioStatus.textContent = "Original piano-like music paused.";
    return;
  }
  await startMusic();
});

musicMute.addEventListener("click", () => {
  musicMuted = !musicMuted;
  if (musicGain && audioContext) {
    musicGain.gain.setTargetAtTime(musicMuted ? 0 : musicVolumeValue, audioContext.currentTime, 0.15);
  }
  musicMute.setAttribute("aria-pressed", String(musicMuted));
  musicMute.setAttribute("aria-label", musicMuted ? "Unmute music" : "Mute music");
  musicMute.textContent = musicMuted ? "Unmute" : "Mute";
  audioStatus.textContent = musicMuted ? "Original piano-like music muted." : "Original piano-like music unmuted.";
});

musicVolume.addEventListener("input", () => {
  musicVolumeValue = Number(musicVolume.value) / 100;
  if (musicGain && audioContext) {
    musicGain.gain.setTargetAtTime(musicMuted ? 0 : musicVolumeValue, audioContext.currentTime, 0.08);
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && musicPlaying && audioContext && audioContext.state === "running") {
    audioContext.suspend();
  } else if (!document.hidden && musicPlaying && audioContext && audioContext.state === "suspended") {
    audioContext.resume().catch((error) => {
      console.error("Could not resume the original background music.", error);
      audioStatus.textContent = "The original background music could not resume.";
    });
  }
});
