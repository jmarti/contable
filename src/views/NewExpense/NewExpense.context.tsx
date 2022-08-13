import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useAppContext } from "../../App.context"
import moneyServices from "../../services/money.services"
import persistDataService from "../../services/persistData.service"

type Amount = number | null

type NewExpenseContextType = {
    amount: Amount,
    setAmount: (amount: Amount) => void,
    currentCurrency: string | null
    setCurrentCurrency: (currency: string | null) => void
    conversionRate: number | null
    convertedAmount: Amount
}


export const NewExpenseContext = createContext<NewExpenseContextType>({
    amount: null,
    setAmount: () => { },
    currentCurrency: null,
    setCurrentCurrency: () => { },
    conversionRate: null,
    convertedAmount: null
})

export const NewExpenseContextProvider = ({ children }: { children: ReactNode }) => {
    const { baseCurrency } = useAppContext()
    
    const [currentCurrency, setCurrentCurrency] = useState<string | null>(null)
    const [amount, setAmount] = useState<Amount>(null)
    const [conversionRate, setConversionRate] = useState<number | null>(null)
    const [convertedAmount, setConvertedAmount] = useState<Amount>(null)
    
    useEffect(() => {
        const lastCurrentCurency = persistDataService.get('currentCurrency')
        if (lastCurrentCurency) {
            setCurrentCurrency(lastCurrentCurency)
        }
    }, [])

    useEffect(() => {
        persistDataService.set('currentCurrency', currentCurrency)
    }, [currentCurrency])

    useEffect(() => {
        async function getConversionRate(from: string, to: string) {
            if (from === to) {
                setConversionRate(null)
                return
            }
            
            const rate = await moneyServices.converter(from, to)
            setConversionRate(rate)
        }

        if (currentCurrency && baseCurrency) {
            getConversionRate(currentCurrency, baseCurrency)
        }
    }, [currentCurrency, baseCurrency])

    useEffect(() => {
        if (!amount) {
            setConvertedAmount(null)
        }

        if (amount && conversionRate) {
            setConvertedAmount(amount * conversionRate)
        }
    }, [amount, conversionRate])

    return (
        <NewExpenseContext.Provider value={{
            amount,
            setAmount,
            currentCurrency,
            setCurrentCurrency,
            conversionRate,
            convertedAmount
        }}>
            {children}
        </NewExpenseContext.Provider>
    )
}

export const useNewExpenseContext = () => useContext(NewExpenseContext)