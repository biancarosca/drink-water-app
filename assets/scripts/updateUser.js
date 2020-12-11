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
        user.history[todayDateString].percentageDrank = 0;
    }
    
    const numberOfDecimals = countDecimals(user.glassCapacity);
    user.history[todayDateString].amountDrank += user.glassCapacity;
    user.history[todayDateString].amountDrank = parseFloat(user.history[todayDateString].amountDrank.toFixed(numberOfDecimals));
    user.history[todayDateString].percentageDrank = parseFloat((user.percentage*user.history[todayDateString].amountDrank / user.glassCapacity).toFixed(0));

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
        const numberOfDecimals = countDecimals(user.glassCapacity);
        user.history[todayDateString].amountDrank = parseFloat(user.history[todayDateString].amountDrank.toFixed(numberOfDecimals));
        user.history[todayDateString].percentageDrank -= user.percentage;
        user.history[todayDateString].percentageDrank = parseFloat(user.history[todayDateString].percentageDrank.toFixed(0));
    }
    else{
        user.history[todayDateString].amountDrank = 0;
        user.history[todayDateString].percentageDrank = 0;
    }
    
    saveUserToLS(user);
    waterProgress();}
    ,200);
}


export const saveNewSettings = () => {
    const dailyAmtInput = document.getElementById('daily-amt');
    const glassCapInput = document.getElementById('glass-cap');
    const newDailyAmt = parseFloat(dailyAmtInput.value);
    const newGlassCap = parseFloat(glassCapInput.value);
    
    let user = getUserfromLS();

    // add input validation

    user.dailyAmount = newDailyAmt;
    user.glassCapacity = newGlassCap;

    const todayDateString = formattedDate();

    if(user.history[todayDateString])
        {user.percentage = parseFloat( (user.glassCapacity * 100 / user.dailyAmount).toFixed(0)) ;
        const newPercentageForToday = parseFloat((user.history[todayDateString].amountDrank * 100 / newDailyAmt).toFixed(0));
        console.log(newPercentageForToday);
        user.history[todayDateString].percentageDrank = newPercentageForToday;
        }

    saveUserToLS(user);

    //update DOM
    if(user.history[todayDateString])
        waterProgress();
    
}