import { useEffect, useState } from "react"
import { apiClient } from "../services/api-client"
import { CanceledError } from "axios"
import { Rental } from "./useRentals"

type Return = {
  _id: string,
  rental: Rental
  dateReturned: Date
}

const useReturns = () => {
  const [returns, setReturns] = useState<Return[]>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    const controller = new AbortController()

    setIsLoading(true)
    apiClient.get<Return[]>('/returns', { signal: controller.signal })
      .then(data => {
        setIsLoading(false)
        setReturns(data.data)
      }).catch(err => {
        if (err instanceof CanceledError) return
        setError(err.message)
        setIsLoading(false)
      })
    return () => controller.abort()
  }, [])

  return { returns, isLoading, error }
}

export default useReturns
