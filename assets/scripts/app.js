const switchToMainWindow = () => {
    const firstSection = document.querySelector('.set-amount');
    firstSection.style.display = 'none';
    console.log(user);
}

const switchToSecondWindow = () => {
    const h1 = document.querySelector('.set-amount h1');
    h1.innerHTML = 'Set your default glass capacity (in liters)';

}

const submitDailyAmount = () => {
    const input = document.querySelector('.submit input');
    if(submitBtn.classList.contains('first-btn'))
        {user.dailyAmount = parseFloat(input.value);
        switchToSecondWindow();
        }
    else{
        user.glassCapacity = parseFloat(input.value);
        switchToMainWindow();
    }

    input.value= '';
    submitBtn.classList.remove('first-btn');
    // submitBtn.classList.add('second-btn');

}

const submitBtn = document.querySelector('.submit .first-btn');
submitBtn.addEventListener('click', submitDailyAmount);
let user = new Object();