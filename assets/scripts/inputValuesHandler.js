import {switchToMainWindow,switchToSecondWindow} from './inputWindows.js';
import {saveUserToLS} from './localStorage.js';

let user = new Object();

export const submitDailyAmount = () => {
    const submitBtn = document.querySelector('.submit button');
    const input = document.querySelector('.submit input');
    if(submitBtn.classList.contains('first-btn'))
        {user.dailyAmount = parseFloat(input.value);
        switchToSecondWindow();
        }
    else{
        user.glassCapacity = parseFloat(input.value);
        user.percentage = parseFloat( (user.glassCapacity * 100 / user.dailyAmount).toFixed(0)) ;
        saveUserToLS(user);
        switchToMainWindow();
        
    }

    input.value= '';
    submitBtn.classList.remove('first-btn');

}