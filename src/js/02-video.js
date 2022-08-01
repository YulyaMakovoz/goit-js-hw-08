import Player from '@vimeo/player';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const throttle = require('lodash.throttle');


const stopTime = function(data) {
    const time = data.seconds;
    localStorage.setItem("videoplayer-current-time", time);
    console.log(time);
};

player.on('timeupdate',throttle(stopTime, 1000));


const saveTime = localStorage.getItem("videoplayer-current-time");

if (saveTime) {
        player.setCurrentTime(saveTime);
        console.log('save time', saveTime);
}
