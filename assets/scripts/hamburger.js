export const hamburgerHandler = (parentClass) => {
const hamburgerWindow = document.querySelector(`${parentClass} .hamburger-menu`);
hamburgerWindow.classList.toggle('backdrop');
}

 
export const goToPage = (event) => {
    //remove the current window
    let mainParentEl,iconEvent;

    if(event.target.classList.contains('fas'))          //if the clicked btn is the back icon
        {mainParentEl=event.target.parentNode;
        iconEvent=true;
        }
    else if(event.target.parentNode.parentNode.parentNode)
        mainParentEl = event.target.parentNode.parentNode.parentNode;  
    else    //if not the home page menu
        mainParentEl = event.target.parentNode.parentNode;

    const mainParentClass = mainParentEl.classList[0]
    mainParentEl.style.display = 'none';
    
    if(!iconEvent)
        hamburgerHandler(`.${mainParentClass}`);     //toggle menu

    //make the page you go to visible
    const clickedElClass = event.target.classList[0];
    const goToWindow = document.querySelector(`.${clickedElClass}-window`);

    if(clickedElClass === 'dashboard-window')
        goToWindow.style.display= "block";
    else //if go to home page
        goToWindow.style.display= "grid";  
    
    //remove the X icon from dashboard menu
    if(document.querySelector('.fa-times'))
        document.querySelector('.fa-times').classList.replace('fa-times','fa-bars');
}

