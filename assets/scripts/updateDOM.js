import {getUserfromLS} from './localStorage.js';
import {formattedDate} from './currentDate.js';


export const waterProgress = () => {
    const wavePacket = document.querySelector('.wave-container');
    const bottomWater = document.querySelector('.wave-bottom');
    const DOMpercentage = document.querySelector('.amount-drank');

    let user = getUserfromLS();
    let todayDateString=formattedDate();

    if(user.history && user.history[todayDateString])
    {
    const percentageDrank = parseFloat((user.percentage*user.history[todayDateString].amountDrank / user.glassCapacity).toFixed(1));
    const hoorayEl = document.querySelector('.extra-water');
    
    if(percentageDrank <= 100)
        {wavePacket.style.bottom = `${percentageDrank}vh`;
        bottomWater.style.height = `${percentageDrank}vh`;
        hoorayEl.style.display = 'none';
    }
    else{
        wavePacket.style.bottom = `100vh`;
        bottomWater.style.height = `100vh`;
        hoorayEl.style.display = 'block';
    }
    DOMpercentage.innerHTML = `${percentageDrank}%`;
    }
}