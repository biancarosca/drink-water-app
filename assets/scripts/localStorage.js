export const saveUserToLS = (user) => {
    localStorage.setItem('user',JSON.stringify(user));
}

export const getUserfromLS = () => {
    return JSON.parse(localStorage.getItem('user'));
} 

