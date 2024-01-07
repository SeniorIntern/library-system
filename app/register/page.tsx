'use client'
import { apiClient } from "@/app/services/api-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Grid, Text } from "@radix-ui/themes"
import { CSSProperties, useState } from "react"
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import useAuth from "../hooks/useAuth"

const schema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  email: z.string().email().min(3, { message: 'Email is required' }).max(40),
  password: z.string().min(1, { message: 'Password is required' }).max(255),
})

type FormData = z.infer<typeof schema>

const page = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const { token } = useAuth()
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FieldValues) => {
    apiClient.post('/users/isAdmin', {},
      {
        headers: {
          'x-auth-token': token
        }
      })
      .then(res => !res.data.status ?
        setIsAdmin(false)
        :
        apiClient.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password
        }).then(() => {
        })
      ).catch((err) => console.log(err.response?.data))
  }

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

  return (
    <div className="flex h-[70vh] w-full justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border-[1px] border-black rounded-md items-center w-[40vw] py-8"
      >
        {!isAdmin && <Text color="red" size='4'>Staff is not allowed to register staff</Text>}
        <Grid>
          <input
            {...register('name', { required: true })}
            id="name"
            placeholder="name"
            style={inputStyle}
          />
          {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
        </Grid>
        <Grid>
          <input
            {...register('email', { required: true })}
            id="email"
            placeholder="email"
            style={inputStyle}
          />
          {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
        </Grid>
        <Grid>
          <input
            {...register('password', { required: true })}
            id="password"
            type="password"
            placeholder="Password"
            style={inputStyle}
          />
          {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
        </Grid>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default page
