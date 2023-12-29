import { useEffect, useState } from 'react'
import axios from 'axios'
import apiClient from '../services/api-client'

type Genre = {
  _id: string,
  name: string,
  description: string
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    apiClient.get<Genre[]>('/categories', { signal: controller.signal })
      .then(data => {
        setGenres(data.data)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.messgae)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { genres, isLoading, error }
}

export default useGenres
