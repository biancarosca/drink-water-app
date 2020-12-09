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
    saveUserToLS(user);

    waterProgress();

}

export const undoHandler = () => {
    let todayDateString = formattedDate();
    let user = getUserfromLS();
    if(!user.history[todayDateString].amountDrank)
        return;
    else{
        user.history[todayDateString].amountDrank -= user.glassCapacity;
        saveUserToLS(user);
    }

    waterProgress();
}