'use client'

import useAuth from '@/app/hooks/useAuth'
import useBooks, { Book } from '@/app/hooks/useBooks'
import { apiClient } from '@/app/services/api-client'
import { Button } from '@radix-ui/themes'
import { CSSProperties, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function page() {
  const { isLoading } = useAuth()

  const inputStyle: CSSProperties = {
    border: "1px solid black",
    borderRadius: "0.4em",
    padding: "0.3em 0.6em",
    width: "30vw"
  }

  const { books } = useBooks()
  const [bookId, setBookId] = useState<string>()

  const deleteBookById = async () => apiClient.delete<Book>('/books/' + bookId)
    .then(() => {
      toast.success('Book deleted sucessfully!')
    })
    .catch(err => toast.error(err.message))

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Toaster />
      <section className='flex w-full justify-center'>
        <div className='space-x-4'>
          <select
            aria-placeholder="Book title"
            style={inputStyle}
            onChange={(e) => {
              setBookId(e.target.value)
            }}
          >
            <option value="">Select a Book</option>
            {books.map(book => (
              <option
                key={book._id}
                value={book._id}
              >
                {book.title}
              </option>
            ))}
          </select>

          {bookId && <Button onClick={deleteBookById}>DELETE</Button>}
        </div>
      </section>
    </>
  )
}
