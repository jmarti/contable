const persistDataService = {
    get: (key: string) => localStorage.getItem(key),
    set: (key: string, value: string) => localStorage.setItem(key, value),
    delete: (key: string) => localStorage.removeItem(key)
}

export default persistDataService