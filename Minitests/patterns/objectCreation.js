const Utility = require('../utility');
const { inhabitants, locations } = require('../../junkData');
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
            if (GuildHall.instance) {
                return GuildHall.instance;
            }
            this._manager = manager;
            GuildHall.instance = this;
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
 * Wrap a newer API implementation to the old API interface for legacy support
 */
const adapterPattern = () => {
    class Member {
        constructor () {
            this.name = Mocker.quickGenerate('fullName');
        }
    }
    class Adventurer extends Member {
        constructor () {
            super();
            this._type = 'adventurer';
            this._party = Utility.chooseRandom(locations);
        }

        introduce () {
            console.log(`This is ${this.name} adventuring with ${this._party}'s party.`);
        }
    }
    class Merchant extends Member {
        constructor () {
            super();
            this._type = 'merchant';
            this._company = Mocker.quickGenerate('company');
        }

        introduce () {
            console.log(`This is ${this.name} on a business trip for ${this._company}`);
        }
    }

    /**
     * Represents original API that is already in use but is not that great
     */
    class OldGuildHall {
        /**
         * @param {( 'adventurer' | 'merchant' )} type 
         */
        getMember (type) {
            console.log(`Old Guild Hall is getting: ${type}`);
            switch (type) {
                case 'adventurer':
                    return new Adventurer();
                default:
                    return new Merchant();
            }
        }
    }

    /**
     * Represents a new rewrite of the class, perhaps more efficient, better code etc.
     */
    class NewGuildHall {
        getAdventurer () {
            console.log('New Guild Hall is getting an adventurer!');
            return new Adventurer();
        }

        getMerchant () {
            console.log('New Guild Hall is getting a merchant!');
            return new Merchant();
        }
    }

    /**
     * Use the new APIs like the old one
     */
    class GuildHallAdapter {
        constructor () {
            this.hall = new NewGuildHall();
        }

        /**
         * @param {( 'Adventurer' | 'Merchant' )} type 
         */
        getMember (type) {
            switch (type) {
                case 'adventurer':
                    return this.hall.getAdventurer();
                default: 
                    return this.hall.getMerchant();
            }
        }
    }

    const existingCode = (guildHallInstance) => {
        try {
            const guy1 = guildHallInstance.getMember('adventurer');
            guy1.introduce();
            const guy2 = guildHallInstance.getMember('merchant');
            guy2.introduce();
        } catch (e) {
            console.log(`API user function errored! ${e.message}`);
        }
    }

    /* Should work with the old API as it is  designed to work with it */
    console.log('> Using OldGuildHall');
    let guildHall = new OldGuildHall();
    existingCode(guildHall);

    /* Should not work with new API */
    console.log('> Using NewGuildHall');
    guildHall = new NewGuildHall();
    existingCode(guildHall);

    /* Should work with the adapter */
    console.log('> Using GuildHalladapter');
    guildHall = new GuildHallAdapter();
    existingCode(guildHall);
};

/**
 * Take advantage of dynamic  objects to add different properties and such to an existing class
 */
const decoratorPattern = () => {
    class Character {
        constructor () {
            this.name = Mocker.quickGenerate('fullName');
            this.company = Mocker.quickGenerate('company');
            this.salary = Mocker.getRandomBetween(20, 200);
        }

        introduce () {
            console.log(`This is ${this.name} working with ${this.company} with a salary of $${this.salary},000k USD`);
            if (this.partner) {
                this.splitEarnings();
            }
            if (this.hasCertificates) {
                console.log(`${this.name} is so rich because of the Axis Certification Program.`);
            }
        }
    }

    /**
     * @param {Character} character 
     */
    const assignPartner = (character) => {
        character.partner = Mocker.quickGenerate('fullName');
        character.splitEarnings = () => {
            console.log(`${character.name} split earnings partner, ${character.partner}`);
        }
    };

    /**
     * @param {Character} character 
     */
    const train = (character) => {
        character.hasCertificates = true;
        character.salary = character.salary + 10;
    }

    let char1 = new Character();
    let char2 = new Character();
    let char3 = new Character();

    assignPartner(char1);
    train(char2);

    char1.introduce();
    char2.introduce();
    char3.introduce();
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

    header('Adapter Pattern');
    adapterPattern();

    header('Decorator Pattern');
    decoratorPattern();
};

main();
