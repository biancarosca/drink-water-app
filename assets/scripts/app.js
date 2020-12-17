import {getUserfromLS} from './localStorage.js';
import {updateDashboardDate} from './currentDate.js';
import {switchToMainWindow} from './inputWindows.js';
import {submitDailyAmount} from './inputValuesHandler.js';
import {addWater,undoHandler,saveNewSettings} from './updateUser.js';
import {waterProgress,addCurentSettingsToDOM} from './updateDOM.js';
import {hamburgerEventListeners} from './hamburgerEvents.js';
import {writeCalendarToDOM,arrowsEventListeners} from './calendar.js';
import {computeAverageCompletion,addEvListenersToStats} from './statistics.js';

if (!getUserfromLS())
{   
    const firstSection = document.querySelector('.start-app');
    firstSection.style.display = 'flex';
    const submitBtn = document.querySelector('.submit .first-btn');
    submitBtn.addEventListener('click', submitDailyAmount);

}
//go straight to dashboard if user already exists in LS
else{
    switchToMainWindow();
    waterProgress();
}

updateDashboardDate();


const addBtn = document.querySelector('main .add-btn');
addBtn.addEventListener('click', addWater);

const undoBtn = document.querySelector('main .undo');
undoBtn.addEventListener('click', undoHandler);

hamburgerEventListeners();

const saveBtn = document.querySelector('.settings-window .save');
saveBtn.addEventListener('click',saveNewSettings);

if(document.querySelector('.start-app').style.display === 'none')       //if the user already exists
    {writeCalendarToDOM();
    addCurentSettingsToDOM();
    computeAverageCompletion(true);
    }

addEvListenersToStats();
arrowsEventListeners();     //event listeners for calendar arrows