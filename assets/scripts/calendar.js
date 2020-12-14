import {getDate} from './currentDate.js';

const createDOMelement = (j,row,i) => {
    const historyWindow = document.querySelector('.history-window');
    const dayEl = document.createElement('div');
    dayEl.classList.add('cal-box');
    const dayBox = document.createElement('span');
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
    monthAndYearEl.innerHTML = `${month}/${year}`;

    const date = new Date();
    const firstDay = new Date(year,date.getMonth()).getDay();      //1st of the month weekday
    const numberOfDaysInCurrMonth = new Date(year,date.getMonth()+1,0).getDate();     
    

    //write first line of the calendar
    let i=1;
    while(i<=7-firstDay)
    {   
        const gridCol = firstDay +i-1;
        i=createDOMelement(i,1,gridCol);
    }


    //write the rest of the lines
    let j=i;
    let row = 2;
    while(j<=numberOfDaysInCurrMonth)
    {let i=0;
    while(i<7)
        {
            j = createDOMelement(j,row,i);
            if(j > numberOfDaysInCurrMonth)
                break;
            i++;
        }
        row++;
    }

}

