import {getUserfromLS} from './localStorage.js';
import {updateDashboardDate} from './currentDate.js';
import {switchToMainWindow} from './inputWindows.js';
import {submitDailyAmount} from './inputValuesHandler.js';
import {addWater,undoHandler} from './updateUser.js';
import {waterProgress} from './updateDOM.js';


if (!getUserfromLS())
{   
    const firstSection = document.querySelector('.start-app');
    firstSection.style.display = 'block';
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