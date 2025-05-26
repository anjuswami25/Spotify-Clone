console.log("Welcome to Spotify");

// Initial Setup
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let currentSongName = document.getElementById('currentSongName');
let songItems = Array.from(document.getElementsByClassName('songItemPlay'));

// Song List
let songs = [
    { songname: "Tere Hath me", filepath: "songs/1.mp3", coverPath: "covers/1.png" },
    { songname: "Love You Oye", filepath: "songs/2.mp3", coverPath: "covers/2.png" },
    { songname: "Pani Da Rang", filepath: "songs/3.mp3", coverPath: "covers/3.png" },
    { songname: "Teri Ore", filepath: "songs/4.mp3", coverPath: "covers/4.png" },
    { songname: "Tere Hath me", filepath: "songs/1.mp3", coverPath: "covers/1.png" }
];

// Set song names and images
Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
});

// Reset all play buttons
function makeAllPlays() {
    songItems.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
    });
}

// Play a specific song
function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play().then(() => {
        makeAllPlays();
        document.getElementById(index).classList.remove('fa-circle-play');
        document.getElementById(index).classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        currentSongName.innerText = songs[songIndex].songname;
    }).catch((err) => {
        console.error("Failed to play:", err);
        alert("Error playing the song. Please check the file path.");
    });
}

// Master Play
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
});

// Handle individual play clicks
songItems.forEach((element) => {
    element.addEventListener('click', (e) => {
        let index = parseInt(e.target.id);
        if (audioElement.paused || songIndex !== index) {
            playSong(index);
        } else {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    });
});

// Time Update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Next Song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Previous Song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});

// Auto-play next on end
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});
