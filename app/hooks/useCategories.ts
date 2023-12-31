import { useEffect, useState } from 'react'
import { apiClient, AxiosError } from '../services/api-client'

export type Category = {
  _id: string,
  name: string,
  description: string,
}

const useCategories = () => {
  const [categories, setBooks] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    apiClient.get<Category[]>('/categories', { signal: controller.signal })
      .then(data => {
        setBooks(data.data)
        setIsLoading(false)
      })
      .catch(err => {
        if (err instanceof AxiosError) return
        setError(err.message)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { categories, isLoading, error }
}

export default useCategories
