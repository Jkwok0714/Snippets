import './AppcueComponent.scss';

const NEXT_CUE_DELAY = 1000;
const HIGHLIGHT_MARGIN = 10;

interface ICueEvent {
    message: string;
    targetElementID: string;
    nextListenerElementID?: string;
    position?: string;
}

interface AppCueComponent {
    steps: ICueEvent[];
    step: number;
    node: HTMLElement;
    highlighter: HTMLElement;
}

class AppCueComponent {
    constructor (steps: ICueEvent[], targetSelector: string) {
        this.steps = steps;
        this.step = 0;
        this.node = this.constructCue();
        this.highlighter = this.constructHighlighter();
        try {
            document.querySelector(targetSelector).appendChild(this.node);
            document.querySelector(targetSelector).appendChild(this.highlighter);
        } catch (e) {
            console.log('Could not find app element to append to');
        }
    }

    constructHighlighter () {
        let node = document.createElement('div');
        node.classList.add('highlight');
        node.classList.add('hidden');
        return node;
    }

    constructCue () {
        let node = document.createElement('div');
        node.classList.add('appcue-box');
        node.classList.add('appcue-hidden');

        let innerText = document.createElement('span');
        innerText.innerHTML = 'TEST';
        innerText.classList.add('appcue-content');
        node.appendChild(innerText);
        return node;
    }

    changeNodeText (text: string) {
        this.node.querySelector('span').innerHTML = text;
    }

    listenForNextShow () {
        if (this.step + 1 >= this.steps.length) return;

        let triggerForNextCue;

        if (this.steps[this.step].nextListenerElementID) {
            triggerForNextCue = document.querySelector(this.steps[this.step].nextListenerElementID);
        } else {
            triggerForNextCue = document.querySelector(this.steps[this.step].targetElementID);
        }

        let callNextCue = () => {
            this.step++;
            setTimeout(() => {
                this.placeCue(this.step);
            }, NEXT_CUE_DELAY);
            triggerForNextCue.removeEventListener('click', callNextCue);
        }

        triggerForNextCue.addEventListener('click', callNextCue);
    }

    hideCue () {
        this.node.classList.add('appcue-hidden');
    }

    showHighlighter (boundingRect: ClientRect) {
        this.highlighter.classList.remove('hidden');
        this.highlighter.style.top = (boundingRect.top - HIGHLIGHT_MARGIN) + 'px';
        this.highlighter.style.left = (boundingRect.left - HIGHLIGHT_MARGIN) + 'px';

        this.highlighter.style.width = (boundingRect.right - boundingRect.left + HIGHLIGHT_MARGIN * 2) + 'px';
        this.highlighter.style.height = (boundingRect.bottom - boundingRect.top + HIGHLIGHT_MARGIN * 2) + 'px';
    }

    hideHighlighter () {
        this.highlighter.classList.add('hidden');
    }

    setNodePosition (position: string) {
        this.node.setAttribute('pointer-position', position);
    }

    placeCue (step: number) {
        this.node.classList.remove('appcue-hidden');

        this.changeNodeText(this.steps[step].message);
        const position = this.steps[step].position || 'left';
        this.setNodePosition(position);


        let target = document.querySelector(this.steps[step].targetElementID);
        target.scrollIntoView({ behavior: 'smooth' });
        let rect = target.getBoundingClientRect();
        this.showHighlighter(rect);

        let eleHeight = rect.bottom - rect.top;

        this.node.style.top = (rect.top - 10 + eleHeight / 2) + 'px';
        if (position === 'left') {
            this.node.style.left = (rect.right + 20) + 'px';
        } else if (position === 'right') {
            this.node.style.left = (rect.left) + 'px';
        }

        let listenFunction = () => {
            this.hideHighlighter();
            this.hideCue();
            target.removeEventListener('click', listenFunction);
        };

        target.addEventListener('click', listenFunction);

        this.listenForNextShow();
    }

    begin () {
        this.placeCue(0);
    }

}

export default AppCueComponent;
