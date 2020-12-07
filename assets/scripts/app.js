import {getUserfromLS} from './localStorage.js';
import {getCurrentDate} from './currentDate.js';
import {switchToMainWindow} from './inputWindows.js';
import {submitDailyAmount} from './inputValuesHandler.js';


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
}

getCurrentDate();
