export type CurrencySymbol = [string, string]
export type CurrencySymbols = { [index: string]: CurrencySymbol }

export const CURRENCY_SYMBOLS: { [index: string]: CurrencySymbol } = {
    EUR: ['€', 'suffix'],
    USD: ['$', 'prefix'],
    COP: ['$', 'prefix'],
    PEN: ['S/', 'prefix']
}