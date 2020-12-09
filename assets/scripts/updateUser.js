import {formattedDate} from './currentDate.js';
import {getUserfromLS,saveUserToLS} from './localStorage.js';
import {waterProgress} from './updateDOM.js';
import {countDecimals} from './utils.js';

export const addWater = () => {
    let user = getUserfromLS();

    if(!user.history)
        user.history = {};

    const todayDateString = formattedDate();

    if(!user.history[todayDateString])
        {user.history[todayDateString] = {};
        user.history[todayDateString].amountDrank = 0;
    }
    
    const numberOfDecimals = countDecimals(user.glassCapacity);
    user.history[todayDateString].amountDrank += user.glassCapacity;
    user.history[todayDateString].amountDrank = parseFloat(user.history[todayDateString].amountDrank.toFixed(numberOfDecimals));
    user.percentageDrank = parseFloat((user.percentage*user.history[todayDateString].amountDrank / user.glassCapacity).toFixed(1));
    saveUserToLS(user);

    waterProgress();

}

export const undoHandler = () => {
    //when user is clicking the button too fast , LS does not have time to update
    setTimeout(function()
    {let todayDateString = formattedDate();
    let user = getUserfromLS();  
    if(user.history[todayDateString].amountDrank - user.glassCapacity >=0)
    {
        user.history[todayDateString].amountDrank -= user.glassCapacity;
        user.percentageDrank -= user.percentage;
        saveUserToLS(user);
    }

    waterProgress();}
    ,200);
}