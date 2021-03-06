import {formattedDate,fromStringToNumberMonth,fromNumberToStringMonth, getDate} from './currentDate.js';
import {getUserfromLS,saveUserToLS} from './localStorage.js';
import {waterProgress,addValidationMessage} from './updateDOM.js';
import {countDecimals} from './utils.js';
import {computeAverageCompletion} from './statistics.js';


export const addUntrackedHistoryDays = () => {
    let user = getUserfromLS();
    if(user.history){
        let firstRecordedDate = user.startingDate.split('/');    
        const firstDay = parseInt(firstRecordedDate[0]);
        const firstMonth = fromStringToNumberMonth(firstRecordedDate[1]);
        const firstYear = parseInt(firstRecordedDate[2]);
        let missingDaysExist;

        let day,month,year;
        [day,month,year] = getDate();
        month = fromStringToNumberMonth(month);
        

        if ((year > firstYear) || (year === firstYear && month > firstMonth) || 
        (year === firstYear && month === firstMonth || day > firstDay))
            missingDaysExist = true;
            

        while(missingDaysExist)
        {   //go from current day to first day in current month
            let i = day;
            while (i > 0)
                {let stringMonth = fromNumberToStringMonth(month);
                let stringDate = `${i}/${stringMonth}/${year}`;
                if (!user.history[stringDate])
                    {user.history[stringDate] = {};
                    user.history[stringDate].amountDrank = 0;
                    user.history[stringDate].percentageDrank = 0;
                    
                    //if a new week began since the weekly average updated
                    user.statistics.currentDayAmount = 0;
                    if(new Date(year,month,i).getDay() === 0)
                        {user.statistics.weeklyAverage = 0;
                        user.statistics.weeklyAverageSum = 0;   
                        }

                    saveUserToLS(user);
                    }
                else 
                    {missingDaysExist = false;
                    break;
                    }
                i--;
                }
            if(missingDaysExist)
                {//go to previous month
                if(month ===0)
                    {year--;
                    month = 11;
                    }
                else
                month--;
                day = new Date(year,month+1,0).getDate();     //number of days in the following month
                }
        }
    }
}

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
    user.history[todayDateString].percentageDrank = parseFloat((user.percentage*user.history[todayDateString].amountDrank / user.glassCapacity).toFixed(numberOfDecimals));

    saveUserToLS(user);

    waterProgress();
    computeAverageCompletion();  //update statistics

}

export const undoHandler = (event) => {
    //when user is clicking the button too fast , LS does not have time to update
    event.target.style.pointerEvents = 'none';

    let todayDateString = formattedDate();
    let user = getUserfromLS();
    if(user.history){
        if(user.history[todayDateString].amountDrank - user.glassCapacity >=0){
            user.history[todayDateString].amountDrank -= user.glassCapacity;
            const numberOfDecimals = countDecimals(user.glassCapacity);
            user.history[todayDateString].amountDrank = parseFloat(user.history[todayDateString].amountDrank.toFixed(numberOfDecimals));
            user.history[todayDateString].percentageDrank -= user.percentage;
            user.history[todayDateString].percentageDrank = parseFloat(user.history[todayDateString].percentageDrank.toFixed(numberOfDecimals));
            }
        else{
            user.history[todayDateString].amountDrank = 0;
            user.history[todayDateString].percentageDrank = 0;
        }

        saveUserToLS(user);
        waterProgress();
        computeAverageCompletion();  //update statistics
    }
}


export const saveNewSettings = () => {
    const dailyAmtInput = document.getElementById('daily-amt');
    const glassCapInput = document.getElementById('glass-cap');
    const newDailyAmt = parseFloat(dailyAmtInput.value);
    const newGlassCap = parseFloat(glassCapInput.value);

    let user = getUserfromLS();

    const regex = /^[+]?((([1-9][0-9]*[.][0-9]*)?[1-9][0-9]*)|([0-9]?[.][1-9]+[0-9]*)|([0-9]?[.][0]*[1-9]+[0-9]*)|([1-9][0-9]*[.][0-9]+))$/;


    if(dailyAmtInput.value.match(regex) && glassCapInput.value.match(regex))      //input validation
    {
    user.dailyAmount = newDailyAmt;
    user.glassCapacity = newGlassCap;

    const numberOfDecimals = countDecimals(user.glassCapacity);
    user.percentage = parseFloat( (user.glassCapacity * 100 / user.dailyAmount).toFixed(numberOfDecimals)) ;

    const todayDateString = formattedDate();
    if(user.history)
    {
    if(user.history[todayDateString])
        {
        const newPercentageForToday = parseFloat((user.history[todayDateString].amountDrank * 100 / newDailyAmt).toFixed(numberOfDecimals));
        user.history[todayDateString].percentageDrank = newPercentageForToday;
        user.history[todayDateString].currentDailyAmount = newDailyAmt;
        }   
    }

    saveUserToLS(user); 
    
    //update DOM
    if(user.history)
        {if(user.history[todayDateString])
            waterProgress();
            computeAverageCompletion();  //update statistics
        }
    

    addValidationMessage('settings-window','success');
    }
    else 
        addValidationMessage('settings-window','error');
    
    }

