import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

type Book = {
  _id: string,
  title: string,
  description: string,
  image_url: string,
}

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    axios.get<Book[]>('http://localhost:3001/api/books', { signal: controller.signal })
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

  return { books, isLoading, error }
}

export default useBooks
