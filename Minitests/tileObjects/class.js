/**
 * The state of the "physical" object of the mob
 * @typedef MobState
 * @property {number} yPos
 * @property {number} xPos
 */

/**
 * @typedef MobDimensions
 * @property {number} width
 * @property {number} height
 */

/**
 * @property {number} id
 * @property {Element} element The reference to a DOM element
 * @property {MobState} state 
 * @property  {MobDimensions} dimensions
 */
class Mob {
    /**
     * @param {number} id 
     * @param {Element} element 
     */
    constructor (id, element) {
        this.id = id;
        this.element = element;
        this.state = {
            xPos: 0,
            yPos: 0
        };
        this.dimensions = this.fillDimensions();
    }

    /**
     * Populate the dimensions of the DOM element
     * @returns {{ width: number, height: number }}
     */
    fillDimensions () {
        if (!this.element) return;
        const rect = this.element.getBoundingClientRect();
        return {
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };
    }

    /**
     * @callback CoordinateSettingCallback
     * @returns {{ x: number, y:  number }}
     */
    /**
     * Initialize the mob, placing it on the stage
     * @param {{ height: number, width: number }} stage The stage that this exists on
     * @param {CoordinateSettingCallback} coordSetter
     */
    init (stage, coordSetter) {
        let xPos, yPos;
        if (coordSetter) {
            const coord = coordSetter();
            xPos = coord.x;
            yPos = coord.y;
        } else {
            xPos = Math.floor(Math.random() * stage.width - this.dimensions.width);
            yPos = Math.floor(Math.random() * stage.height - this.dimensions.height);
        }

        this.state = { xPos, yPos };
        this.updateDOMPosition();
    }

    /**
     * @param {number} x Set xPos
     * @param {number} y Set yPos
     */
    setPos (x, y) {
        this.state.xPos = x;
        this.state.yPos = y;
    }

    /**
     * @returns {{ xPos: number, yPos: number }} The current position
     */
    getPos () {
        return {
            xPos: this.state.xPos,
            yPos: this.state.yPos
        };
    }

    updateDOMPosition () {
        if (!this.element) return;
    }
};

/**
 * @class A Mob controlled by some simple behavior/statemachine
 */
class AutoMob extends Mob {
    constructor (id, element) {
        super(id, element);
    }
}