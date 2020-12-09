import {switchToMainWindow,switchToSecondWindow} from './inputWindows.js';
import {saveUserToLS} from './localStorage.js';
import {countDecimals} from './utils.js';

let user = new Object();
user.percentageDrank = 0;

export const submitDailyAmount = () => {
    const submitBtn = document.querySelector('.submit button');
    const input = document.querySelector('.submit input');
    if(submitBtn.classList.contains('first-btn'))
        {user.dailyAmount = parseFloat(input.value);
        switchToSecondWindow();
        }
    else{
        user.glassCapacity = parseFloat(input.value);
        const numberOfDecimals = countDecimals(user.glassCapacity);
        user.percentage = parseFloat( (user.glassCapacity * 100 / user.dailyAmount).toFixed(numberOfDecimals)) ;
        saveUserToLS(user);
        switchToMainWindow();
        
    }

    input.value= '';
    submitBtn.classList.remove('first-btn');

}