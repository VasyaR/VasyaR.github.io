export class LocalStorage {
    static get(key){
        return JSON.parse(localStorage.getItem(key))
    }
    static add(key, value)
    {
        localStorage.setItem(key, JSON.stringify(value))
    }
    static remove(key)
    {
        localStorage.removeItem(key)
    }
}
