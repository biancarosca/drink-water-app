import {getDate} from './currentDate.js';
import {getUserfromLS,saveUserToLS} from './localStorage.js';
import {waterProgress} from './updateDOM.js';
import {countDecimals} from './utils.js';

export const addWater = () => {
    let user = getUserfromLS();

    if(!user.history)
        user.history = {};

    let day,month,year;
    [day,month,year] = getDate();

    const todayDateString = `${day}/${month}/${year}`;

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