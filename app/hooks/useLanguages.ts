import { useEffect, useState } from 'react'
import { apiClient, AxiosError } from '../services/api-client'

type Language = {
  _id: string,
  language: string
}

const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    apiClient.get<Language[]>('/languages', { signal: controller.signal })
      .then(data => {
        setLanguages(data.data)
        setIsLoading(false)
      })
      .catch(err => {
        if (err instanceof AxiosError) return
        setError(err.message)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { languages, isLoading, error }
}

export default useLanguages
