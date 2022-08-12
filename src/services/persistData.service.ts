import store from 'store'

const persistDataService = {
    get: (key: string) => store.get(key),
    set: (key: string, value: any) => store.set(key, value),
    remove: (key: string) => store.remove(key)
}

export default persistDataService