const app = {
    music: [{
            id: 1,
            artist: "Khalid",
            album: "Up All Night",
            track: "Up All Night",
            length: 0,
            img: "./www/img/Up-All-Night.png",
            src: "file:///android_asset/www/media/Khalid-Up-All-Night.mp3",
        },
        {
            id: 2,
            artist: "Khalid, Kane Brown",
            album: "Suncity",
            track: "Saturday Nights",
            length: 0,
            img: "./www/img/Saturday-Nights.png",
            src: "file:///android_asset/www/media/Khalid-Kane-Brown-Saturday-Nights.mp3",
        },
        {
            id: 3,
            artist: "Khalid, Halsey, Benny Blanco",
            album: "Eastside",
            track: "Eastside",
            length: 0,
            img: "./www/img/Eastside.png",
            src: "file:///android_asset/www/media/Khalid-Eastside.mp3",
        },
        {
            id: 4,
            artist: "Kane Brown, Marshmello",
            album: "One Thing Right",
            track: "One Thing Right",
            length: 0,
            img: "./www/img/One-Thing-Right.png",
            src: "file:///android_asset/www/media/Marshmello-Kane-Brown-One-Thing-Right.mp3",
        },
        {
            id: 5,
            artist: "Kane Brown",
            album: "Experiment",
            track: "For My Daughter",
            length: 0,
            img: "./www/img/For-My-Daughter.png",
            src: "file:///android_asset/www/media/Kane-Brown-For-My-Daughter.mp3",
        }
    ],
    status: {
        '0': 'MEDIA_NONE',
        '1': 'MEDIA_STARTING',
        '2': 'MEDIA_RUNNING',
        '3': 'MEDIA_PAUSED',
        '4': 'MEDIA_STOPPED'
    },
    err: {
        '1': 'MEDIA_ERR_ABORTED',
        '2': 'MEDIA_ERR_NETWORK',
        '3': 'MEDIA_ERR_DECODE',
        '4': 'MEDIA_ERR_NONE_SUPPORTED'
    },
    currentTrackIndex: null,
    media: null,
    intervalId: null,
    trackprogress: document.querySelector('#trackprogress'),


    init: function () {
        let doc = new DocumentFragment();
        app.music.forEach((track, index) => {
            let div = document.createElement('div');
            div.setAttribute('id', `track${(index+1)}`);
            div.setAttribute('data-id', track.id);

            let p1 = document.createElement('p');
            p1.setAttribute('data-id', track.id);
            p1.textContent = `Track: ${track.track}`;

            let p2 = document.createElement('p');
            p2.setAttribute('data-id', track.id);
            p2.textContent = `Artist: ${track.artist}`;

            let p3 = document.createElement('p');
            p3.setAttribute('data-id', track.id);
            p3.textContent = `Length: ${track.length}`;

            let p4 = document.createElement('p');
            p4.setAttribute('data-id', track.id);
            p4.textContent = `Album: ${track.album}`;

            div.appendChild(p1);
            div.appendChild(p2);
            div.appendChild(p3);
            div.appendChild(p4);
            doc.appendChild(div);
        });
        document.querySelector('#track-screen').appendChild(doc);
        app.listener();
    },

    listener: function () {
        document.querySelector('#to-play-screen').addEventListener('click', app.changePlayscreen);
        document.querySelector('#track1').addEventListener('click', app.track1);
        document.querySelector('#track2').addEventListener('click', app.track2);
        document.querySelector('#track3').addEventListener('click', app.track3);
        document.querySelector('#track4').addEventListener('click', app.track4);
        document.querySelector('#track5').addEventListener('click', app.track5);

        document.querySelector('#to-track-list').addEventListener('click', app.changetrackscreen);
        document.querySelector('#skipback').addEventListener('click', app.prevPlay);
        document.querySelector('#skipfor').addEventListener('click', app.nextPlay);
        document.querySelector('#play').addEventListener('click', app.playTrack);
        document.querySelector('#pause').addEventListener('click', app.pauseTrack);
    },

    changetrackscreen: function (ev) {
        document.querySelector('#play-screen').setAttribute('class', 'disable');
        document.querySelector('#track-list').setAttribute('class', 'able');
    },

    changePlayscreen: function (ev) {
        document.querySelector('#track-list').setAttribute('class', 'disable');
        document.querySelector('#play-screen').setAttribute('class', 'able');
    },


    track1: function (ev) {
        app.currentTrackIndex = app.music.findIndex(track => {
            if (track.id === parseInt(ev.target.getAttribute('data-id')))
                return true;
        });
        app.playTrack();
        app.changePlayscreen();
    },

    track2: function (ev) {
        app.currentTrackIndex = app.music.findIndex(track => {
            if (track.id === parseInt(ev.target.getAttribute('data-id')))
                return true;
        });
        app.playTrack();
        app.changePlayscreen();
    },

    track3: function (ev) {
        app.currentTrackIndex = app.music.findIndex(track => {
            if (track.id === parseInt(ev.target.getAttribute('data-id')))
                return true;
        });
        app.playTrack();
        app.changePlayscreen();
    },

    track4: function (ev) {
        app.currentTrackIndex = app.music.findIndex(track => {
            if (track.id === parseInt(ev.target.getAttribute('data-id')))
                return true;
        });
        app.playTrack();
        app.changePlayscreen();
    },

    track5: function (ev) {
        app.currentTrackIndex = app.music.findIndex(track => {
            if (track.id === parseInt(ev.target.getAttribute('data-id')))
                return true;
        });
        app.playTrack();
        app.changePlayscreen();
    },

    playTrack: function () {
        console.log('currentTrackIndex: ', app.currentTrackIndex);

        let currentTrack = document.querySelector('#currenttrack');
        currentTrack.innerHTML = '';
        let p1 = document.createElement('p');
        p1.textContent = `Track: ${app.music[app.currentTrackIndex].track}`;
        let p2 = document.createElement('p');
        p2.textContent = `Artist: ${app.music[app.currentTrackIndex].artist}`;
        let p3 = document.createElement('p');
        p3.textContent = `Length: ${app.music[app.currentTrackIndex].length}`;
        currentTrack.appendChild(p1);
        currentTrack.appendChild(p2);
        currentTrack.appendChild(p3);

        let src = app.music[app.currentTrackIndex].src;
        if (app.media !== null) {
            app.media.release();
            app.media = null
        }
        app.media = new Media(src, app.good, app.bad, app.statusChange);
        app.media.play();
    },

    pauseTrack: function () {
        app.media.pause();
    },

    good: function () {
        console.log('Hurray');
    },

    bad: function () {
        console.log('Houston we have a problem');
    },

    statusChange: function (status) {
        console.log('media status ' + app.status[status]);

        if (status === '4') {
            app.nexPlay();
        }

        if (status === '1' || status === '2') {
            intervalId = setInterval(app.length, 1000);
        }
        if (status === '3') {
            clearInterval(intervalId);
        }
    },


    position: function () {
        app.media.getCurrentPosition((pos) => {
            let dur = app.media.getDuration();
            console.log('current position', pos);
            console.log('duration', dur);
            trackprogress.innerHTML = `${pos}`
        });
    },

    

    nextPlay: function () {
        app.currentTrackIndex++;
        if (app.currentTrackIndex >= app.music.length) {
            app.currentTrackIndex = 0;
        }
        app.playTrack();
    },

    prevPlay: function () {
        app.currentTrackIndex--;
        if (app.currentTrackIndex < 0) {
            app.currentTrackIndex = app.music.length - 1;
        }
        app.playTrack();
    }
};



let ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";
document.addEventListener(ready, app.init);