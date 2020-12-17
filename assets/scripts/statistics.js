import {getUserfromLS,saveUserToLS} from './localStorage.js';

export const computeAverageCompletion = (isAlreadyComputed = false) => {
    let user = getUserfromLS();
    if (user.history && !isAlreadyComputed)    //only if values exist and the avg changed
        {
            let percentagesDrankSum = 0;
            let numberOfDays = Object.entries(user.history).length;
            Object.entries(user.history).forEach((day) => {
               percentagesDrankSum += day[1].percentageDrank;   //add the percentage from every day 
           })
           const averageCompletion =  parseFloat((percentagesDrankSum / numberOfDays).toFixed(1));
           user.averageCompletion = averageCompletion;
           saveUserToLS(user);
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
        if(user.averageCompletion > 100)
            user.averageCompletion = 100;       //the progress pie should not overshoot
        const strokeDashOffset = parseFloat((440 - (user.averageCompletion * 440 ) / 100).toFixed(0));  
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
    const DOMpercentage = document.querySelector('.pie-container .percentage');
    DOMpercentage.innerHTML = `${user.averageCompletion}%`;
}