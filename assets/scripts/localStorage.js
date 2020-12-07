export const saveUserToLS = (user) => {
    localStorage.setItem('user',JSON.stringify(user));
}

export const getUserfromLS = () => {
    return localStorage.getItem('user');
} 

