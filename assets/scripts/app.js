import {getUserfromLS} from './localStorage.js';
import {updateDashboardDate,formattedDate} from './currentDate.js';
import {switchToMainWindow} from './inputWindows.js';
import {submitDailyAmount} from './inputValuesHandler.js';
import {addWater,undoHandler,saveNewSettings,addUntrackedHistoryDays} from './updateUser.js';
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
    addUntrackedHistoryDays();  //if the user did not use the app on some days, they are added to history as 0%
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

    let user = getUserfromLS();
    if(user.history)
        {if(formattedDate != user.statistics.calculatedOnDate)   //the date has changed, values need update
            computeAverageCompletion();
        else
            computeAverageCompletion(false);        //the value is not changed, only DOM is rendered
        }
    }
addEvListenersToStats();
arrowsEventListeners();     //event listeners for calendar arrows