let sdbmCode = function(str, salt, max = 100){
    var hash = 0;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = char + (hash << salt) + (hash << 16) - hash;
    }
    return Math.abs(hash % max);
}

let getFavGenre = (num) => {
  if (num > 90) {
    return 'Trip-Hop';
  } else if (num > 60) {
    return 'Country';
  } else if (num > 40) {
    return 'Smooth Jazz';
  } else if (num > 35) {
    return 'Chillstep';
  } else {
    return 'Club Music';
  }
};

let getFavWaifu = (num) => {
  if (num > 90) {
    return 'Oshino Shinobu';
  } else if (num > 60) {
    return 'Aqua';
  } else if (num > 40) {
    return 'Ursula';
  } else if (num > 35) {
    return 'Satania';
  } else {
    return 'Ririko Oribe';
  }
};

let getFavBeer = (num) => {
  if (num > 90) {
    return 'Coors';
  } else if (num > 60) {
    return 'Corona';
  } else if (num > 40) {
    return 'Bud Light';
  } else if (num > 15) {
    return 'Blue Ribbon';
  } else {
    return 'Chamomile Tea';
  }
};

let max = 100;

let findPreferences = (name) => {
  console.log('\x1b[36m+Mapping random preferences for', name, '\x1b[0m');
  console.log(name, 'likes:', getFavBeer(sdbmCode(name, 4)), '-', getFavWaifu(sdbmCode(name, 5)), '-', getFavGenre(sdbmCode(name, 6)));
};

findPreferences('Tooty Tootsen');
findPreferences('Markus Valhalla');
findPreferences('Smithy Blues');
findPreferences('Operatic Bass');
findPreferences('Juha Bach');
findPreferences('Bhen-Bhen');
findPreferences('Sad Doom Vox Grill');
findPreferences('Tri-note Man');
findPreferences('Achraf, Defender of Yerusalem');
findPreferences('Abbath');
