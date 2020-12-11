const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const getSuffix = (day) => {
    if(day>10 && day < 20)      //exception to the rule : eleventh, twelfth etc.
        return 'th';
    else{
    if(day % 10 === 1)
        return 'st';
    else if (day % 10 ===2 )
        return 'nd';
    else if (day % 10 ===3)
        return 'rd';
    else return 'th';
    }
}

const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return [day,month,year];
}

export const updateDashboardDate = () =>{
    let day,month,year;

    [day,month,year] = getDate();

    //write today's date
    const dateEl = document.querySelector('.date-container');
    dateEl.innerHTML+= `${day}<sup>${getSuffix(day)}</sup> ${month} ${year}`;

}


export const formattedDate = () => {
    let day,month,year;
    [day,month,year] = getDate();
    return`${day}/${month}/${year}`;
}