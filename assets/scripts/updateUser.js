import {getDate} from './currentDate.js';
import {getUserfromLS,saveUserToLS} from './localStorage.js';
import {waterProgress} from './updateDOM.js';


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
    
    user.history[todayDateString].amountDrank += user.glassCapacity;
    saveUserToLS(user);

    waterProgress();

}