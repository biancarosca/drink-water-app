import {getUserfromLS,saveUserToLS} from './localStorage.js';
import {formattedDate,getDate} from './currentDate.js';



const userIsInFirstWeek = () => {
    let user = getUserfromLS();
    let day,month,year;
    [day,month,year] = getDate();
    const userStartingDateArr = user.startingDate.split('/');
    const userStartingDay = parseInt(userStartingDateArr[0]);
    const userStartingMonth = userStartingDateArr[1];
    const userStartingYear = parseInt(userStartingDateArr[2]);

    //calculate number of days since start
    const numDays = day - userStartingDay +1 ;
    
    if ( year === userStartingYear && month === userStartingMonth && day - userStartingDay <=6)
            return numDays;
    else
        return 0;
}


const computeWeeklyAverage = () => {
    let user = getUserfromLS();
    let currWeekDay;
    //if the user is in the first week, the days before joining are not considered
    if(userIsInFirstWeek())
        currWeekDay = userIsInFirstWeek() - 1;
    else
        currWeekDay = new Date().getDay();
    
    const todayStringDate = formattedDate();
    //remove the previous value from the sum, add the updated one
    user.statistics.weeklyAverageSum -= user.statistics.currentDayAmount;
    user.statistics.currentDayAmount = user.history[todayStringDate].amountDrank;
    user.statistics.weeklyAverageSum += user.statistics.currentDayAmount;
    
    user.statistics.weeklyAverageSum = parseFloat(user.statistics.weeklyAverageSum.toFixed(1));     //fixed to 1 decimal 
    user.statistics.weeklyAverage = parseFloat((user.statistics.weeklyAverageSum / (currWeekDay+1) ).toFixed(1));

    saveUserToLS(user);
    
}

const computeMonthlyAverage = () => {
    let user = getUserfromLS();
    const currentMonth = formattedDate().split('/')[1];
    let totalAmountDrank = 0;
    let numberOfDays = 0;
    let monthlyAverage;
    Object.entries(user.history).forEach((entry) => {
        const todayDate = entry[0];
        if (todayDate.split('/')[1] === currentMonth)
            {totalAmountDrank += user.history[todayDate].amountDrank;
            numberOfDays++;
            }
    })
    monthlyAverage = parseFloat((totalAmountDrank / numberOfDays).toFixed(1));
    user.statistics.monthlyAverage = monthlyAverage;
    saveUserToLS(user);
    // writeDOMprogress();
}

export const computeAverageCompletion = (valueIsChanged = true) => {
    let user = getUserfromLS();
    if(!user.statistics)
    {user.statistics = {};
    user.statistics.weeklyAverage = 0;
    user.statistics.weeklyAverageSum = 0;
    user.statistics.currentDayAmount = 0;
    }

    if (user.history && valueIsChanged)    
        {let percentagesDrankSum = 0;
        let numberOfDays = Object.entries(user.history).length;
        Object.entries(user.history).forEach((day) => {
            percentagesDrankSum += day[1].percentageDrank;   //add the percentage from every day 
        })
        const averageCompletion =  parseFloat((percentagesDrankSum / numberOfDays).toFixed(1));
        user.statistics.averageCompletion = averageCompletion;
        user.statistics.calculatedOnDate = formattedDate();
        saveUserToLS(user);
        computeMonthlyAverage();
        computeWeeklyAverage();
        }
    if(user.history)
        writeDOMprogress();
        
}

export const addEvListenersToStats = () => {
    document.querySelectorAll('.statistics').forEach((el) => {
        el.addEventListener('click',animateProgressPie);      //only when Statistics is accessed, the pie animation starts
    })
}

const animateProgressPie = () => {
    let user = getUserfromLS();
    if (user.history)
    {
        if(user.statistics.averageCompletion > 100)
            user.statistics.averageCompletion = 100;       //the progress pie should not overshoot
        const strokeDashOffset = parseFloat((440 - (user.statistics.averageCompletion * 440 ) / 100).toFixed(0));  
        const circle = document.querySelector('.circle-svg .circle-over');
        circle.animate([{
            strokeDashoffset: 440
        },
        {
            strokeDashoffset: `${strokeDashOffset}`
        }],{
            duration: 2500,
            fill: 'forwards',
            easing: 'linear'
        });
    }

}

const writeDOMprogress = () => {
    let user = getUserfromLS();

    //average completion
    const DOMpercentage = document.querySelector('.pie-container .percentage');
    DOMpercentage.innerHTML = `${user.statistics.averageCompletion}%`;

    //monthly average
    const DOMmonthlyAvg = document.querySelector('.monthly-avg h2');
    DOMmonthlyAvg.innerHTML = `${user.statistics.monthlyAverage} L /day`;

    //weekly average
    const DOMweeklyAvg = document.querySelector('.weekly-avg h2');
    DOMweeklyAvg.innerHTML = `${user.statistics.weeklyAverage} L /day`;
}