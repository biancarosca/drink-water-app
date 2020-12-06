//hide dashboard when the app starts
const dashboard = document.querySelector('.dashboard');
dashboard.style.display = 'none';
const submitBtn = document.querySelector('.submit .first-btn');
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let user = new Object();

const saveUserToLS = () => {
    localStorage.setItem('user',JSON.stringify(user));
}

const getUserfromLS = () => {
    return localStorage.getItem('user');
} 
 

const switchToMainWindow = () => {
    const firstSection = document.querySelector('.start-app');
    firstSection.style.display = 'none';
    dashboard.style.display='block';
    const body = document.querySelector('body');
    body.style.display= 'block';
}

const switchToSecondWindow = () => {
    const h1 = document.querySelector('.set-amount h1');
    let copy = h1.cloneNode(true);
    h1.parentNode.replaceChild(copy,h1);
    copy.innerHTML = 'Set your default glass capacity (in liters)';

}

const submitDailyAmount = () => {
    const input = document.querySelector('.submit input');
    if(submitBtn.classList.contains('first-btn'))
        {user.dailyAmount = parseFloat(input.value);
        switchToSecondWindow();
        }
    else{
        user.glassCapacity = parseFloat(input.value);
        saveUserToLS();
        switchToMainWindow();
    }

    input.value= '';
    submitBtn.classList.remove('first-btn');


}

if (!getUserfromLS())
{
    submitBtn.addEventListener('click', submitDailyAmount);
    
}
//go straight to dashboard if user already exists in LS
else{
    switchToMainWindow();
}

const getSuffix = (day) => {
    if(day % 10 === 1)
        return 'st';
    else if (day % 10 ===2 )
        return 'nd';
    else if (day % 10 ===3)
        return 'rd';
    else return 'th';
}

const writeTodayDate = () =>{
    const dateEl = document.querySelector('.date-container');
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
   
    //update DOM
    dateEl.innerHTML+= `${day}<sup>${getSuffix(day)}</sup> ${month} ${year}`;

}

writeTodayDate();
