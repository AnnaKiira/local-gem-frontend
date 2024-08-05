// import { getToken } from './authService.js'

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/places`

export const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return res.json
    } catch (error) {
        
    }
}


export const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
       // headers: { 
         // Authorization: `Bearer ${getToken()}` 
       // },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }


export const show = async (placeId) => {
    try {
      const res = await fetch(`${BASE_URL}/${placeId}`, {
        //headers: {
         // Authorization: `Bearer ${getToken()}`
        //}
      })
      return res.json();
    } catch (error) {
      console.log(error)
    }
}
