
/**
 * Guardamos en el localStorage
 * @param {*} key 
 * @param {*} data 
 */
export const  saveLocalStorage = (key,data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Recuperamos del localStorage
 * @param {*} key
 * 
 */
export const  getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}