import React, {useState, useEffect, useCallback} from "react"

export default () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method="GET", body = null, headers={}) => {
        setLoading(true)
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            })
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                throw new Error(data.message || "Ошибка")
            }
            setLoading(false)
            return data
        } catch(e) {
            setLoading(false)
            setError(e.message)
        }
    }, [])
    return {loading, request, error}
}
