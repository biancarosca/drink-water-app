import {hamburgerHandler,goToPage} from './hamburger.js';

export const hamburgerEventListeners = () => {

const menuListClasses = ['.settings','.history','.statistics','.dashboard'];

menuListClasses.forEach((menuListClass)=>{
    const oneElMenuBtns = document.querySelectorAll(menuListClass);
    oneElMenuBtns.forEach((btn) => {
    btn.addEventListener('click',goToPage);
})

})


const hamburgerIcons = document.querySelectorAll('.hamburger');
hamburgerIcons.forEach((btn) => {
    btn.addEventListener('click', function (event) {
       
        if(event.target.parentNode.classList[0])
            hamburgerHandler(`.${event.target.parentNode.classList[0]}`);
        else    //if not home page menu
            hamburgerHandler(`.${event.target.parentNode.parentNode.classList[0]}`);
    })
})

}