import axios from "axios"

const converter = async (from: string, to: string): Promise<number> => {
    const { data: { result } } = <{ data: { result: number } }>await axios.get(`https://api.exchangerate.host/convert`, {
        params: { from, to }
    })

    return result
}

export default { converter }