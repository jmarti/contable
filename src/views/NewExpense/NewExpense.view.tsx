import { useEffect, useState } from "react"
import { Button, Card, Form, Select, Space } from "antd"
import NumberFormat, { NumberFormatValues } from "react-number-format"

import { NewExpenseContextProvider, useNewExpenseContext } from "./NewExpense.context"
import classNames from "classnames"

import classes from './NewExpense.module.css'
import { BaseOptionType } from "antd/lib/select"
import { useAppContext } from "../../App.context"
import { CurrencySymbol, CURRENCY_SYMBOLS } from "../../constants/currency.constants"


const NewExpenseView = () => {
    const { baseCurrency } = useAppContext()
    const {
        amount,
        conversionRate,
        convertedAmount,
        currentCurrency,
        setCurrentCurrency,
        setAmount
    } = useNewExpenseContext()

    const [convertedAmountText, setConvertedAmountText] = useState<string>('')
    const [conversionRateText, setConversionRateText] = useState<string>('')
    const [currencySymbol, setCurrencySymbol] = useState<CurrencySymbol | null>(null)

    const [form] = Form.useForm<{ amount: number, currency: string }>()

    // Disable submit when necessary at first.
    const [, forceUpdate] = useState({})
    useEffect(() => forceUpdate({}), [])

    useEffect(() => { form.resetFields(['currency']) }, [currentCurrency])

    useEffect(() => {
        if (!amount || !conversionRate || !convertedAmount) {
            setConvertedAmountText('')
            setConversionRateText('')
            return
        }

        const convertedAmountLocaleString = (Math.round(convertedAmount * 100) / 100)
            .toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        setConvertedAmountText(`${convertedAmountLocaleString} ${baseCurrency}`)

        const conversionRateLocaleString = (Math.round(conversionRate * 100) / 100)
            .toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
        setConversionRateText(`1 ${currentCurrency} = ${conversionRateLocaleString} ${baseCurrency}`)
    }, [amount, conversionRate, convertedAmount])

    useEffect(() => {
        if (!currentCurrency) {
            setCurrencySymbol(null)
            return
        }
        setCurrencySymbol(CURRENCY_SYMBOLS[currentCurrency])
    }, [currentCurrency])

    const handleAmountChange = (values: NumberFormatValues) => {
        setAmount(values.floatValue || null)
    }

    const handleCurrencySelection = ((_: any, option: BaseOptionType) => {
        setCurrentCurrency(option.value)
    })

    const handleSubmit = async () => { }
    return (
        <>
            <Card title="New expense" bordered={false}>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleSubmit}
                    initialValues={{ currency: currentCurrency }}
                >
                    <Space style={{ position: 'relative' }}>
                        <Form.Item
                            name="amount"
                            label="Amount"
                            rules={[{ required: true, message: 'Enter the amount.' }]}
                            help={<small>{conversionRateText}</small>}
                        >
                            <>
                                <NumberFormat
                                    suffix={currencySymbol && currencySymbol[1] === 'suffix' && currencySymbol[0] || undefined}
                                    prefix={currencySymbol && currencySymbol[1] === 'prefix' && currencySymbol[0] || undefined}
                                    className={classNames(
                                        'ant-input',
                                        'ant-input-lg',
                                        classes.amountInput,
                                        amount && convertedAmountText && classes.amountInput__withValue
                                    )}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    decimalScale={2}
                                    // fixedDecimalScale
                                    allowNegative={false}
                                    inputMode="tel"
                                    onValueChange={handleAmountChange}
                                />
                                <span className={classes.convertedAmount}>{convertedAmountText}</span>
                            </>
                        </Form.Item>
                        <Form.Item name="currency" noStyle>
                            <Select
                                className={classes.currencySelector}
                                bordered={false}
                                onSelect={handleCurrencySelection}
                            >
                                <Select.Option value="COP">COP</Select.Option>
                                <Select.Option value="EUR">EUR</Select.Option>
                                <Select.Option value="PEN">PEN</Select.Option>
                                <Select.Option value="USD">USD</Select.Option>
                            </Select>
                        </Form.Item>
                    </Space>
                        
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                            >
                                Add new expense
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default () => <NewExpenseContextProvider><NewExpenseView /></NewExpenseContextProvider>