const Utility = require('../utility');
const { inhabitants } = require('../../junkData');
const Mocker = require('../microprojects/Mocker');

/**
 * Using the normal constructor pattern for object construction
 */
const constructorPattern = () => {
    class Character {
        /**
         * @param {string} name 
         * @param {string} location 
         */
        constructor (name, location) {
            this.name = name;
            this.location = location;
        }

        introduce () {
            console.log(`This is ${this.name}. ${this.name} is from ${this.location}`);
        }
    }

    const createChar = () => {
        const selected = Utility.chooseRandom(inhabitants);
        return new Character(selected.name, selected.hometown);
    };

    const char = createChar();
    char.introduce();
};

/**
 * Using the factory pattern, best for managing multiple object types that are similar
 * It can apply properties and perform object setup unlike with accessing individual constructors
 */
const factoryPattern = () => {
    class GuildHall {
        /**
         * @param {( 'adventurer' | 'idiot' )} type 
         * @returns {( Adventurer | Idiot )}
         */
        recruit (type) {
            const ret = type === 'adventurer' ? new Adventurer() : new Idiot();
            this.populateData(ret);
            ret.introduce = () => {
                console.log(`This is ${ret.name}, a ${ret._type} from ${ret.location}.`);
            };
            return ret;
        }

        /**
         * @param {( Adventurer | Idiot )} character 
         */
        populateData (character) {
            const selected = Utility.chooseRandom(inhabitants);
            character.name = selected.name;
            character.location = selected.hometown;
        }
    }

    class Adventurer {
        constructor () {
            this._type = 'adventurer';
        }

        action () {
             console.log(`This ${this._type} goes out to slay giant toads.`);
        }
    }

    class Idiot {
        constructor () {
            this._type = 'idiot';
        }

        action () {
            console.log(`This ${this._type} gets eaten by giant toads.`);
        }
    }

    const guildHall = new GuildHall();

    const char1 = guildHall.recruit('adventurer');
    const char2 = guildHall.recruit('idiot');

    char1.introduce();
    char1.action();

    char2.introduce();
    char2.action();
};

/**
 * A singleton pattern that allows just one instance of something
 */
const singletonPattern = () => {
    class GuildHall {
        /**
         * @param {string} manager 
         */
        constructor(manager) {
            this.announcement(manager);
            if (GuildHall.exists) {
                return GuildHall.instance;
            }
            this._manager = manager;
            GuildHall.instance = this;
            GuildHall.exists = true;
            return this;
        }

        /**
         * @param {string} manager 
         */
        announcement (manager) {
            console.log(`Guild Hall admins are trying to establish a guild hall led by ${manager}`);
        }

        postQuest () {
            console.log(`${this._manager} has posted a quest at the guild hall!`);
        }
    }

    const axelHall = new GuildHall(Mocker.quickGenerate('fullName'));
    axelHall.postQuest();

    const alcanretiaHall = new GuildHall(Mocker.quickGenerate('fullName'));
    alcanretiaHall.postQuest();
};

/**
 * Print a section header
 * @param {string} value
 */
const header = (value) => {
    console.log(`\x1b[32m== ${value} ==\x1b[0m`);
};

/**
 * Run all the patterns to test them
 */
const main = () => {
    header('Constructor Pattern');
    constructorPattern();

    header('Factory Pattern');
    factoryPattern();

    header('Singleton Pattern');
    singletonPattern();
};

main();
