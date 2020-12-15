import {writeCalendarToDOM} from './calendar.js';
import {addCurentSettingsToDOM} from './updateDOM.js';

export const switchToMainWindow = () => {
    const firstSection = document.querySelector('.start-app');
    firstSection.style.display = 'none';
    const dashboard = document.querySelector('.dashboard-window');
    dashboard.style.display='block';
    const body = document.querySelector('body');
    body.style.display= 'block';

    writeCalendarToDOM();
    addCurentSettingsToDOM();
}

export const switchToSecondWindow = () => {
    const h1 = document.querySelector('.set-amount h1');
    let copy = h1.cloneNode(true);
    h1.parentNode.replaceChild(copy,h1);
    copy.innerHTML = 'Set your default glass capacity (in liters)';

}
