/**
 * @file Playing around with using an object to store function calls instead of if/switch usage
 * Created Aug 13 2018
 */

const LOCATIONS = {
  RELINQ: 'Relinq',
  ACARIME: 'Acarime',
  LUGERA: 'Lugera'
}

const cases = {
  [LOCATIONS.LUGERA]: {
    function: (character) => { console.log(`${character.name} prays at the cathedral.`) },
    weapon: 'staff'
  },
  [LOCATIONS.ACARIME]: {
    function: (character) => { console.log(`${character.name} is protesting legislative changes.`) },
    weapon: 'crossbow'
  },
  [LOCATIONS.RELINQ]: {
    function: (character) => { console.log(`${character.name} is doing mad parkour.`) },
    weapon: 'dagger'
  }
};

const defaultLocation = 'Lugera';

class Character {
  constructor (name) {
    this.name = name;
    this.location = defaultLocation;
  }

  getLocation () {
    console.log(`${this.name} is in ${this.location}`);
  }

  tour () {
    try {
      cases[this.location].function(this);
      console.log(`${this.name} brandishes a ${cases[this.location].weapon} at arbitrary people`);
    } catch (e) {
      console.log(`Where the hell is ${this.location}`);
    }
  }

  move (location) {
    this.location = location;
    console.log(`${this.name} has moved to ${location}`);
  }
}

let ashera = new Character('Ashera');
ashera.getLocation();
ashera.move(LOCATIONS.RELINQ);
ashera.tour();
