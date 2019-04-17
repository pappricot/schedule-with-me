//localStorage is a store in your browser which persists even if you close a tab or exit your browser window. The storage works on a per-origin basis

export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    //we use try in case of using incognito mode
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};
