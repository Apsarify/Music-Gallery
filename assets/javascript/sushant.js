const music = new Audio('../assets/songs/1.mp3')

const songs = [
    {
        id: 1,
        songName: `Sarangi<br><div class="subtitle">- Sushant KC</div>`,
        cover: "../assets/cover/Sushant-KC/1.jpg"
    },
    {
        id: 2,
        songName: `Maya<br><div class="subtitle">- Ashutosh KC</div>`,
        cover: "../assets/cover/Sushant-KC/2.jpg"
    },
    {
        id: 3,
        songName: `Timi sangai<br><div class="subtitle">- VEK</div>`,
        cover: "../assets/cover/Sushant-KC/3.jpg"
    },
    {
        id: 4,
        songName: `Je Chau Timi<br><div class="subtitle">-  Swoopna x Samir</div>`,
        cover: "../assets/cover/Sushant-KC/4.jpg"
    },
    {
        id: 5,
        songName: `Lai Bari Lai<br><div class="subtitle">- VEK</div>`,
        cover: "../assets/cover/Sushant-KC/5.jpg"
    },
    {
        id: 6,
        songName: `Pheri Bheta Nahola><div class="subtitle">- Rikesh Gurung</div>`,
        cover: "../assets/cover/Sushant-KC/6.jpg"
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].cover;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave')
masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add('active1')
    } else {
        music.pause()
        masterPlay.classList.remove("bi-pause-fill");
        masterPlay.classList.add("bi-play-fill");
        wave.classList.remove('active1')
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('PlayListPlay')).forEach((els) => {
        els.classList.remove('bi-play-circle-fill')
        els.classList.add('bi-pause-circle-fill')
        wave.classList.add('active1')
    })
};

const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((ell) => {
        ell.style.background = 'rgb(105, 105, 105, 0)';
    })
};

let index = 1;
let download_music = document.getElementById('download_music');
let PlaylistPlay = document.getElementsByClassName('PlaylistPlay');
let controller_cover = document.getElementById('controller_cover');
let title = document.getElementById('title');
Array.from(PlaylistPlay).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        music.src = `../assets/songs/${index}.mp3`;
        controller_cover.src = `../assets/cover/${index}.jpg`;
        music.play();
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        wave.classList.add('active1')
        download_music.href = `assets/songs/${index}.mp3`;

        let songTitles = songs.filter((els) => {
            return els.id == index;
        })
        songTitles.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName
            download_music.setAttribute('download', songName)
        })

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105, 105, 105, 1)';
        makeAllPlays();
        el.target.classList.remove('bi-play-circle-fill')
        el.target.classList.add('bi-pause-circle-fill')
    })
})

let currentStart = document.getElementById('currentStart')
let currentEnd = document.getElementById('currentEnd')
let seek = document.getElementById('seek')
let bar2 = document.getElementById('bar2')
let dot = document.getElementsByClassName('dot')

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    let min1 = Math.floor(music_dur / 60)
    let sec1 = Math.floor(music_dur % 60)
    if (sec1 < 10) {
        sec1 = `0${sec1}`
    }
    currentEnd.innerText = `${min1}:${sec1}`
    let min2 = Math.floor(music_curr / 60)
    let sec2 = Math.floor(music_curr % 60)
    if (sec2 < 10) {
        sec2 = `0${sec2}`
    }
    currentStart.innerText = `${min2}:${sec2}`

    // Seek Bar

    let progressBar = parseInt((music_curr / music_dur) * 100)
    seek.value = progressBar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    document.getElementById('dot').style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = (seek.value * music.duration / 100)
})

let vol_icon = document.getElementById('vol_icon')
let vol = document.getElementById('vol')
let vol_dot = document.getElementById('vol_dot')
let vol_bar = document.getElementById('vol_bar')

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill')
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.add('bi-volume-mute-fill')
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill')
        vol_icon.classList.add('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill')
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`
    vol_dot.style.left = `${vol_a}%`
    music.volume = vol_a * music.volume / 100;
    console.log(music.volume);
})

let back = document.getElementById('back')
let next = document.getElementById('next')

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = document.getElementsByClassName('songItem').length
    }
    music.src = `../assets/songs/${index}.mp3`;
    controller_cover.src = `../assets/cover/${index}.jpg`;
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add('active1')

    let songTitles = songs.filter((els) => {
        return els.id == index;
    })
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
    })

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105, 105, 170, .1)';
    makeAllPlays();
    console.log(songTitles)
})

next.addEventListener('click', () => {
    index += 1;
    if (index < 1) {
        index = document.getElementsByClassName('songItem').length
    }
    if (index > document.getElementsByClassName('songItem').length) {
        index = 1
    }
    music.src = `../assets/songs/${index}.mp3`;
    controller_cover.src = `../assets/cover/${index}.jpg`;
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add('active1')

    let songTitles = songs.filter((els) => {
        return els.id == index;
    })
    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName
    })

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = 'rgb(105, 105, 170, .1)';
    makeAllPlays();
    console.log(songTitles)
})





let pop_song_left = document.getElementById("pop_song_left");
let pop_song_right = document.getElementById("pop_song_right");
let pop_song = document.getElementsByClassName("pop_song")[0];


pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})
pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})

let artist_left = document.getElementById("artist_left");
let artist_right = document.getElementById("artist_right");
let artist = document.getElementsByClassName("item")[0];
artist_right.addEventListener('click', () => {
    artist.scrollLeft += 330;
})
artist_left.addEventListener('click', () => {
    artist.scrollLeft -= 330;
})