import {getUserfromLS} from './localStorage.js';
import {formattedDate} from './currentDate.js';
import {writeCalendarToDOM} from './calendar.js';



export const waterProgress = () => {
    const wavePacket = document.querySelector('.wave-container');
    const bottomWater = document.querySelector('.wave-bottom');
    const DOMpercentage = document.querySelector('.amount-drank');

    let user = getUserfromLS();
    let todayDateString=formattedDate();

    if(user.history && user.history[todayDateString])
    {
    const hoorayEl = document.querySelector('.extra-water');
    
    if(user.history[todayDateString].percentageDrank <= 100)
        {wavePacket.style.bottom = `${user.history[todayDateString].percentageDrank}vh`;
        bottomWater.style.height = `${user.history[todayDateString].percentageDrank}vh`;
        hoorayEl.style.display = 'none';
    }
    else{
        wavePacket.style.bottom = `100vh`;
        bottomWater.style.height = `100vh`;
        hoorayEl.style.display = 'block';
    }
    DOMpercentage.innerHTML = `${user.history[todayDateString].percentageDrank}%`;
    }

    writeCalendarToDOM();   //update history

   document.querySelector('.dashboard-window .undo').style.pointerEvents = 'initial';


}

export const addCurentSettingsToDOM = () => {
    let user = getUserfromLS();
    document.getElementById('daily-amt').value = user.dailyAmount;
    document.getElementById('glass-cap').value = user.glassCapacity;
}

export const addValidationMessage = (parentEl,message) => {
    const messageEl= document.querySelector(`.${parentEl} .${message}`);
    messageEl.style.display = 'flex';
    setTimeout(function() {
        messageEl.style.display = 'none';
    },2000);

}