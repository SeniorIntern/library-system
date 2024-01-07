import { useEffect, useState } from 'react'
import { apiClient, CanceledError } from '../services/api-client'

export type Category = {
  _id: string,
  name: string,
  description: string,
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    apiClient.get<Category[]>('/categories', { signal: controller.signal })
      .then(data => {
        setCategories(data.data)
        setIsLoading(false)
      })
      .catch(err => {
        if (err instanceof CanceledError) return
        setError(err.message)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { categories, isLoading, error }
}

export default useCategories
