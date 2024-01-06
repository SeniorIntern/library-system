'use client'

import useBooks, { Book } from '@/app/hooks/useBooks'
import { apiClient } from '@/app/services/api-client'
import useUserStore from '@/app/store'
import { Button, Flex, Grid } from '@radix-ui/themes'
import { redirect } from 'next/navigation'
import { CSSProperties, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'

export default function page() {
  const inputStyle: CSSProperties = {
    border: "1px solid black",
    borderRadius: "0.4em",
    padding: "0.3em 0.6em",
    width: "30vw"
  }

  const errorStyle: CSSProperties = {
    color: "red",
    fontSize: "0.8rem"
  }

  const { token } = useUserStore()
  if (!token) return redirect('/login')

  const [book, setBook] = useState<Book>()
  const { books } = useBooks()

  const findBookById = async (id: string) => await apiClient.get<Book>('/books/' + id).then(res => {
    setBook(res.data)
  })

  const schema = z.object({
    username: z.string().min(3, { message: "Name is required" }),
    email: z.string().email().min(3, { message: "Email is required" }),
    address: z.string().min(3, { message: "Address is required" }),
  })

  const { handleSubmit, register, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const { username, email, address } = data
    apiClient.post('/rentals', { username, email, address, bookId: book?._id })
      .then(() => {
        toast.success('Book rented sucessfully!')
      }).catch((err) => toast.error(err?.message))
  }

  return (
    <>
      <Toaster />
      <Flex direction='column' width='100%' align='center' justify="center">
        <select
          aria-placeholder="Book title"
          style={inputStyle}
          className='mb-4'
          onChange={(e) => {
            findBookById(e.target.value)
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

        {book &&
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 border-[1px] border-black rounded-md items-center w-[40vw] py-8"
          >
            <Grid>
              <input
                {...register('username')}
                id="username"
                placeholder="Name of the User"
                style={inputStyle}
              />
              {errors.username && <span style={errorStyle}>{errors.username.message}</span>}
            </Grid>
            <Grid>
              <input
                {...register('email')}
                id="email"
                placeholder="Email"
                style={inputStyle}
              />
              {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
            </Grid>
            <Grid>
              <input
                {...register('address')}
                id="address"
                placeholder="address"
                style={inputStyle}
              />
              {errors.address && <span style={errorStyle}>{errors.address.message}</span>}
            </Grid>
            <Button type='submit'>RENT</Button>
          </form>
        }
      </Flex>
    </>
  )
}
