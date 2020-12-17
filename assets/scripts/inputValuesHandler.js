import {switchToMainWindow,switchToSecondWindow} from './inputWindows.js';
import {saveUserToLS} from './localStorage.js';
import { addValidationMessage,addCurentSettingsToDOM} from './updateDOM.js';
import {countDecimals} from './utils.js';

let user = new Object();

export const submitDailyAmount = () => {
    const submitBtn = document.querySelector('.submit button');
    const input = document.querySelector('.submit input');
    const regex = /^[+]?((([1-9][0-9]*[.][0-9]*)?[1-9][0-9]*)|([0-9]?[.][1-9]+[0-9]*)|([0-9]?[.][0]*[1-9]+[0-9]*)|([1-9][0-9]*[.][0-9]+))$/;
    if(submitBtn.classList.contains('first-btn'))
        {
            if(input.value.match(regex))
            {user.dailyAmount = parseFloat(input.value);
            switchToSecondWindow();
            submitBtn.classList.remove('first-btn');
            }
            else{
            addValidationMessage('start-app','start-input-error');

            }
        }
    else{
        if(input.value.match(regex))
            {user.glassCapacity = parseFloat(input.value);
            const numberOfDecimals = countDecimals(user.glassCapacity);
            user.percentage = parseFloat( (user.glassCapacity * 100 / user.dailyAmount).toFixed(numberOfDecimals)) ;
            saveUserToLS(user);
            switchToMainWindow();
            addCurentSettingsToDOM();
            }
        else{
            addValidationMessage('start-app','start-input-error');
        }
        
    }
    input.value= '';

}