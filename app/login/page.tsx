'use client'
import AuthProvider from "@/AuthProvider"
import { AxiosError, apiClient } from "@/app/services/api-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Grid } from "@radix-ui/themes"
import { useRouter } from "next/navigation"
import { CSSProperties } from "react"
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().min(3, { message: 'Email cannot be empty' }).max(40),
  password: z.string().min(1, { message: 'Password cannot be empty' }).max(255),
})

type FormData = z.infer<typeof schema>

const page = () => {
  const router = useRouter()
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FieldValues) => {
    const res = apiClient.post('/auth', {
      email: data.email,
      password: data.password
    }).then(data => {
      console.log('data=', data);
      localStorage.setItem('token', data.data)
      router.push('/');
    }).catch((err: AxiosError) => console.log(err.response?.data))
  }

  const inputStyle: CSSProperties = {
    border: "1px solid black",
    borderRadius: "0.4em",
    padding: "0.3em 0.6em",
  }

  const errorStyle: CSSProperties = {
    color: "red",
    fontSize: "0.8rem"
  }

  return (
    <AuthProvider>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border-[1px] border-black rounded-md items-center w-[40vw] py-8"
        >
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
    </AuthProvider>
  )
}

export default page
