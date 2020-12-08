import {getUserfromLS} from './localStorage.js';
import {getDate} from './currentDate.js';


export const waterProgress = () => {
    const wavePacket = document.querySelector('.wave-container');
    const bottomWater = document.querySelector('.wave-bottom');
    const DOMpercentage = document.querySelector('.amount-drank');

    let user = getUserfromLS();
    let day,month,year;
    [day,month,year] = getDate();
    const todayDateString = `${day}/${month}/${year}`;

    if(user.history && user.history[todayDateString])
    {
    const percentageDrank = user.percentage*user.history[todayDateString].amountDrank / user.glassCapacity;
    if(percentageDrank <= 100)
        {wavePacket.style.bottom = `${percentageDrank}vh`;
        bottomWater.style.height = `${percentageDrank}vh`;
    }
    else{
        wavePacket.style.bottom = `100vh`;
        bottomWater.style.height = `100vh`;
        const hoorayEl = document.querySelector('.extra-water');
        hoorayEl.style.display = 'block';
    }
    DOMpercentage.innerHTML = `${percentageDrank}%`;
    }
}