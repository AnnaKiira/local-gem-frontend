//Auth Service will be added here

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]))
    return user;
}


export {getUser}