import { useEffect, useState } from "react"
import { Book } from "./useBooks"
import { apiClient, AxiosError } from '../services/api-client'

const useBook = (id: string) => {
  const [book, setBook] = useState<Book>({} as Book)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(false)
    apiClient.get<Book>('/books/' + id, { signal: controller.signal }).then(data => {
      setBook(data.data)
      setIsLoading(false)
    }).catch(err => {
      if (err instanceof AxiosError) return
      setError(err.message)
      setIsLoading(false)
    })

    return () => controller.abort()
  }, [])

  return { book, error, isLoading }
}

export default useBook
