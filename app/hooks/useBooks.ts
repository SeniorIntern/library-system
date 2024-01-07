import { useEffect, useState } from 'react'
import { apiClient, CanceledError } from '../services/api-client'

export type Book = {
  _id: string,
  title: string,
  description: string,
  image_url: string,
  language: {
    _id: string,
    language: string
  },
  author: string,
  category: {
    _id: string,
    name: string,
    description: string
  }
}


type UnpopulatedBook = {
  _id: string,
  title: string,
  description: string,
  image_url: string,
  language: string,
  authors: [string],
  category: string
}

const useBooks = () => {
  const [books, setBooks] = useState<UnpopulatedBook[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    apiClient.get<UnpopulatedBook[]>('/books', { signal: controller.signal })
      .then(data => {
        setBooks(data.data)
        setIsLoading(false)
      })
      .catch(err => {
        if (err instanceof CanceledError) return
        setError(err.message)
        setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { books, isLoading, error }
}

export default useBooks
