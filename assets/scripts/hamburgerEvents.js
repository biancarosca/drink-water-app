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

        //toggle between hamburger and X icons
        if(event.target.classList.contains('fa-bars'))
           event.target.classList.replace('fa-bars','fa-times');
        else
           event.target.classList.replace('fa-times','fa-bars');
       
        if(event.target.parentNode.classList[0])
            hamburgerHandler(`.${event.target.parentNode.classList[0]}`);
        else    //if not home page menu
            hamburgerHandler(`.${event.target.parentNode.parentNode.classList[0]}`);
    })
})

}