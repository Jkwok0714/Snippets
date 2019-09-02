/**
 * @file Create fake things in this self contained file
 * @author me
 */

/**
 * Types of fake stuff we can use with quick generate
 * @enum {string} FakeStuffTypes
 */
const FAKE_TYPES = {
    id: 'id',
    eventTitle: 'eventTitle',
    eventDescription: 'eventDescription',
    date: 'date',
    time: 'time',
    firstName: 'firstName',
    lastName: 'lastName',
    token: 'token',
    hexColor: 'hexColor',
    company: 'company',
    fullName: 'fullName'
}

/**
 * The fake thing machine
 * @class
 */
class Mocker {
    /**
     * Quickly generate something by type
     * @param {FAKE_TYPES} type 
     * @returns {string} The rando thing you asked for
     */
    static quickGenerate (type) {
        switch (type) {
            case FAKE_TYPES.date:
                return `${Mocker.getRandomBetween(2010, 2030)}-${1, 12}-${1, 28}`;
            case FAKE_TYPES.time:
                const padZero = (num) => ('' + num).length === 1 ? `0${num}` : num;
                const minute = Mocker.percent() > 50 ? '00' : '30';
                return `${padZero(Mocker.getRandomBetween(0, 23))}:${minute}:00`;
            case FAKE_TYPES.id:
                return '' + Mocker.getRandomBetween(1, 1000);
            case FAKE_TYPES.token:
                return Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
            case FAKE_TYPES.firstName:
                return Mocker.randomPluck(FIRST_NAMES);
            case FAKE_TYPES.lastName:
                return Mocker.randomPluck(LAST_NAMES);
            case FAKE_TYPES.fullName:
                return `${Mocker.quickGenerate(FAKE_TYPES.firstName)} ${Mocker.quickGenerate(FAKE_TYPES.lastName)}`;
            case FAKE_TYPES.hexColor:
                return  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            case FAKE_TYPES.eventDescription:
                return new Array(Mocker.getRandomBetween(1, 10)).fill('').map(() => Mocker.quickGenerate(FAKE_TYPES.token)).join(' ');
            case FAKE_TYPES.eventTitle:
                return Mocker.randomPluck(TITLE_METHODS)();
            case FAKE_TYPES.company:
                return Mocker.randomPluck(COMPANY_METHODS)();
            default:
                return '';
        }
    }

    /**
     * Get random numbers in a range
     * @param {number} min 
     * @param {number} max 
     * @returns {number} The random number
     */
    static getRandomBetween (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Select an element from an array randomly
     * @param {Array} arr 
     */
    static randomPluck (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * Percent chance type generator
     */
    static percent () {
        return Mocker.getRandomBetween(0, 100);
    }

    /**
     * Generate a random event
     */
    static getEvent () {
        return {
            id: Mocker.quickGenerate(FAKE_TYPES.id),
            token: Mocker.quickGenerate(FAKE_TYPES.token),
            accountID: Mocker.quickGenerate(FAKE_TYPES.id),
            title: Mocker.quickGenerate(FAKE_TYPES.eventTitle),
            description: Mocker.quickGenerate(FAKE_TYPES.eventDescription),
            date: Mocker.quickGenerate(FAKE_TYPES.date),
            time: Mocker.quickGenerate(FAKE_TYPES.time),
            lang: 'en'
        };
    }

    /**
     * Generate a random person e.g. a participant for the event
     */
    static getParticipant () {
        const firstName = Mocker.quickGenerate(FAKE_TYPES.firstName);
        const lastName = Mocker.quickGenerate(FAKE_TYPES.lastName);

        return {
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            email: `${(firstName + lastName).toLowerCase()}${Mocker.getRandomBetween(1, 100)}@${Mocker.randomPluck(DOMAINS)}`,
            company: Mocker.quickGenerate(FAKE_TYPES.company)
        };
    }
}

/**
 * Ways we can construct a title
 */
const TITLE_METHODS = [
    () => `${Mocker.randomPluck(TITLE_LEADIN)} ${Mocker.randomPluck(NOUNS)}`,
    () => `${Mocker.randomPluck(TITLE_LEADIN)} ${Mocker.randomPluck(NOUNS)} & ${Mocker.randomPluck(NOUNS)}`,
    () => `${Mocker.randomPluck(LAST_NAMES)}: ${Mocker.randomPluck(NOUNS)} ${Mocker.randomPluck(TITLE_AFTER)}`,
    () => `${Mocker.randomPluck(NOUNS)} ${Mocker.randomPluck(TITLE_AFTER)}`,
    () => `${Mocker.randomPluck(FIRST_NAMES)} ${Mocker.randomPluck(LAST_NAMES)} on ${Mocker.randomPluck(NOUNS)}`,
    () => `${Mocker.randomPluck(NOUNS)} & ${Mocker.randomPluck(NOUNS)}`,
    () => `${ Mocker.randomPluck(TITLE_NAME) } ${ Mocker.randomPluck(FIRST_NAMES) } ${ Mocker.randomPluck(LAST_NAMES) }`
];

const COMPANY_METHODS = [
    () => `${Mocker.randomPluck(NOUNS)} ${Mocker.randomPluck(COMPANY_SUFFIX_1)}`,
    () => `${Mocker.randomPluck(LAST_NAMES)} ${ Mocker.randomPluck(Mocker.percent() > 50 ? COMPANY_SUFFIX_2 : COMPANY_SUFFIX_1)}`,
    () => `${Mocker.randomPluck(Mocker.percent() > 50 ? LAST_NAMES : NOUNS)} ${Mocker.randomPluck(WIDGETS)}`,
    () => `${Mocker.randomPluck(LAST_NAMES)} ${Mocker.randomPluck(COMPANY_SUFFIX_2)} ${Mocker.randomPluck(WIDGETS)}`
];

const COMPANY_SUFFIX_1 = [
    'Industries',
    'Inc',
    'Brands',
    'Conglomerates',
    'Ltd.',
    'Business Partners',
    'Corp.',
    'Productions',
    'Company',
    'Enterprises',
    'University'
];

const COMPANY_SUFFIX_2 = [
    '& Friends',
    '& Sons',
    '& Co.',
    '& Daughters',
    'Company'
];

const WIDGETS = [
    'Widgets',
    'Construction',
    'Automobile',
    'Plumbing',
    'Animation',
    'Electronics',
    'Electric Instruments',
    'Records',
    'Furnishings',
    'Foods',
    'Computer',
    'Brewery',
    'Speedy Wagons',
    'Unlimited Blade Works',
    'Brewery & Taproom'
];

/**
 * First names. Is that a fucking JoJo's reference?
 */
const FIRST_NAMES = [
    'Jotaro',
    'Noriaki',
    'Joseph',
    'Dio',
    'Muhammad',
    'Jean Pierre',
    'Robert E.O.',
    'Caesar',
    'Will A.', 
    'Erina',
    'Josuke',
    'Giorno',
    'Bruno',
    'Rohan',
    'Okuyasu',
    'Tonio',
    'Jolyne',
    'Ermes',
    'Guido',
    'Koichi',
    'Trish',
    'Enrico',
    'Narancia',
    'Leone',
    'Rudol',
    'Smokey',
    'Yukako',
    'Yoshikage',

    'Lisa Lisa',
    'Iggy',
    'Jonathon'
];

/**
 * Last names. Is that also a fucking JoJo's reference?
 */
const LAST_NAMES = [
    'Kujo',
    'Kakyoin',
    'Joestar',
    'Brando',
    'Avdol',
    'Polnareff',
    'Speedwagon',
    'Zeppeli',
    'Pendleton',
    'Higashikata',
    'Giovanna',
    'Bucciarati',
    'Kishibe',
    'Nijimura',
    'Trussardi',
    'Cujoh',
    'Costello',
    'Mista',
    'Hirose',
    'Una',
    'Pucci',
    'Ghirga',
    'Abbacchio',
    'von Stroheim',
    'Brown',
    'Yamagishi',
    'Kira'
];

/**
 * Email domains
 */
const DOMAINS = [
    'hmail.com',
    'gemail.com',
    'jeemail.com',
    'scorchmail.com',
    'praetonmail.com',
    'ecloud.com',
    'facelook.com',
    'msm.com',
    'sgcglobal.net',
    'ayol.com',
    'yippee.com',
    'inlook.com',
    'ucs.edu',
    'kyoami.co.jp'
];

/**
 * Some nouns for use: plural or proper
 */
const NOUNS = [
    'British Shorthair Cats',
    'Mine-Kraft',
    'Etrien Odyssey',
    'Dragon no Dogma',
    'Starbind',
    'General Kanobi',
    '『STAND』 Users',
    'Hamon',
    'Lavender Evergarden',
    'The Axxis Cult',
    'The Many Partners of Valin Scryber',
    'Deeper Six (Battlingbot)',
    'New Wave of British Heavy Metal',
    'i-VI Chord Progressions',
    'Ironic Maiden',
    'Imsomnium',
    'Orphan Land',
    'Disillusioned',
    'Jasmine Rice',
    'Kyoto Shrines',
    'Akihabara',
    'Cuddly Octopus + A&J',
    'Tokyo-Style Ramen',
    'Instant Noodles',
    'Northeastern IPAs',
    'Orange and Cream Wheat Ales',
    'The Blueberry Pi'
];

/**
 * Stuff that can go before a noun to make a title
 */
const TITLE_LEADIN = [
    'Event: On',
    'A Look At',
    'Why You Should Like',
    'Talks on',
    'The World With',
    'Reflections on',
    'The Genius of',
    'Thoughts on',
    'Best Things Series:',
    'Behind',
    'The Case Against',
    ''
];

/**
 * Stuff that can go after a noun to form a title
 */
const TITLE_AFTER = [
    'and You',
    'and Their Effects',
    '- A Discussion',
    ': The Third Chapter',
    'the Event',
    'Yes! Yes! Yes! Yes!',
    'No! No! No! No!',
    '- Better Than You',
    'is Truly Awful: A Look Inside the World\'s Worst',
    '101',
    ': An Introduction',
    ''
];

/**
 * Lead-ins to titles made with a name
 */
const TITLE_NAME = [
    'An Evening With',
    'Works By',
    'The Films of',
    'The Genius of',
    'Opinions of',
    'A Talk With',
    'BedX Talk:',
    'Thoughts of',
    'Introspectives With',
    'Heavy Riffing By',
    'Watch Bad Tapping Licks Played by'
];

module.exports = Mocker;