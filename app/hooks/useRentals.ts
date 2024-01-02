import { useEffect, useState } from "react"
import { Book } from "./useBooks"
import { apiClient } from "../services/api-client"
import { CanceledError } from "axios"

type Customer = {
  name: string,
  address: string,
  email: string
}

export type Rental = {
  _id: string,
  customer: Customer,
  book: Book,
  dateOut: Date,
  hasReturned: boolean
}

const useRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    apiClient.get<Rental[]>('/rentals', { signal: controller.signal }).then(res => {
      setRentals(res.data)
      setIsLoading(false)
    }).catch(err => {
      if (err instanceof CanceledError) return
      setError(err.message)
      setIsLoading(false)
    }
    )
    return () => controller.abort()
  }, [])

  return { rentals, setRentals, isLoading, error }
}

export default useRentals
