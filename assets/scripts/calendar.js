import {getDate} from './currentDate.js';
import {getUserfromLS} from './localStorage.js'

const createTooltip = (dayEl,dayBox,user,date) => {
    //create tooltip
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip','ttp-display-none');
    dayEl.appendChild(tooltip);

    //hover effect , working for mobile too
    dayBox.addEventListener('mouseover',function (event) {
        if(event.target.parentNode.querySelector('.tooltip').classList.contains('ttp-display-none'))
            event.target.parentNode.querySelector('.tooltip').classList.replace('ttp-display-none','ttp-display-flex');
        else
            event.target.parentNode.querySelector('.tooltip').classList.replace('ttp-display-flex','ttp-display-none');
    })

    dayBox.addEventListener('mouseout',function(event) {
        event.target.parentNode.querySelector('.tooltip').classList.replace('ttp-display-flex','ttp-display-none');
    })


    //add text to tooltip
    const amountDrank = user.history[date].amountDrank;
    let targetAmount;
    if(user.history[date].currentDailyAmount)        //true if the daily amount was modified in the app
        targetAmount = user.history[date].currentDailyAmount;
    else
        targetAmount = user.dailyAmount;

    tooltip.innerHTML = `<p>${amountDrank}L / ${targetAmount}L</p>
    <p>${user.history[date].percentageDrank}%</p>
    `;
} 

const createDOMelement = (j,row,i,month,year) => {
    const historyWindow = document.querySelector('.history-window');
    const dayEl = document.createElement('div');
    dayEl.classList.add('cal-box');

    const dayBox = document.createElement('span');

    //style the date (goal achieved or not)
    let user = getUserfromLS();
    const todayDateString = `${j}/${month}/${year}`;
    if(user.history && user.history[todayDateString])
        {let dailyAmt ;
            if(user.history[todayDateString].currentDailyAmount)        //true if the daily amount was modified in the app
                dailyAmt = user.history[todayDateString].currentDailyAmount;
            else
                dailyAmt = user.dailyAmount;

            if(user.history[todayDateString].amountDrank >= dailyAmt)      //goal achieved
                dayBox.classList.add('achieved');
        
            else
                dayBox.classList.add('not-achieved');

            createTooltip(dayEl,dayBox,user,todayDateString);
        }

    dayEl.appendChild(dayBox);
    dayBox.innerHTML = `${j}`;
    j++;
    dayEl.style.gridRow = `${3+row}/${4+row}`;
    dayEl.style.gridColumn = `${3+i}/${4+i}`;
    historyWindow.appendChild(dayEl);
    return j;
}


export const writeCalendarToDOM = () => {
    let day,month, year;
    [day,month,year] = getDate();
    const monthAndYearEl = document.querySelector('.history-window h2');
    monthAndYearEl.innerHTML = `${month} / ${year}`;

    const date = new Date();
    const firstDay = new Date(year,date.getMonth()).getDay();      //1st of the month weekday
    const numberOfDaysInCurrMonth = new Date(year,date.getMonth()+1,0).getDate();     
    

    //write first line of the calendar
    let i=1;
    while(i<=7-firstDay)
    {   
        const gridCol = firstDay +i-1;
        i=createDOMelement(i,1,gridCol,month,year);
    }


    //write the rest of the lines
    let j=i;
    let row = 2;
    while(j<=numberOfDaysInCurrMonth)
    {let i=0;
    while(i<7)
        {
            j = createDOMelement(j,row,i,month,year);
            if(j > numberOfDaysInCurrMonth)
                break;
            i++;
        }
        row++;
    }

}

