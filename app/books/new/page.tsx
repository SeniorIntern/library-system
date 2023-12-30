'use client'
import { apiClient } from "@/app/services/api-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Grid } from "@radix-ui/themes"
import { CSSProperties } from "react"
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(3, { message: 'Title can not be less than 3 characters' }).max(40),
  description: z.string().min(10, { message: 'Descrition can not be less than 10 characters' }).max(255),
  image_url: z.string().min(1, { message: 'Image URL is required' }),
  thumbnail_url: z.string().min(1, { message: 'Thumbail URL is requried' }),
  category: z.string().min(1, { message: 'Category is requried' }),
  language: z.string().min(1, { message: 'Language is requried' })
})

type FormData = z.infer<typeof schema>

const page = () => {
  const inputStyle: CSSProperties = {
    border: "1px solid black",
    borderRadius: "0.4em",
    padding: "0.3em 0.6em",
  }

  const errorStyle: CSSProperties = {
    color: "red",
    fontSize: "0.8rem"
  }

  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = (data: FieldValues) => {
    const { title, description, image_url, thumbnail_url, authors, category, language } = data
    apiClient.post('/books', { title, description, image_url, thumbnail_url, authors, category, language })
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border-[1px] border-black rounded-md items-center w-[40vw] py-8"
      >
        <Grid>
          <input
            {...register('title', { required: true })}
            id="title"
            placeholder="Book Title"
            style={inputStyle}
          />
          {errors.title && <span style={errorStyle}>{errors.title.message}</span>}
        </Grid>
        <Grid>
          <textarea
            {...register('description', { required: true })}
            id="description"
            placeholder="Short Description"
            style={inputStyle}
          />
          {errors.description && <span style={errorStyle}>{errors.description.message}</span>}
        </Grid>
        <Grid>
          <input
            {...register('image_url')}
            id="image_url"
            placeholder="Image URL"
            style={inputStyle}
          />
          {errors.image_url && <span style={errorStyle}>{errors.image_url.message}</span>}
        </Grid>
        <Grid>
          <input
            {...register('thumbnail_url')}
            id="thumbnail_url"
            placeholder="Thumbnail image URL"
            style={inputStyle}
          />
          {errors.thumbnail_url && <span style={errorStyle}>{errors.thumbnail_url.message}</span>}
        </Grid>
        <Grid>
          <input
            {...register('category')}
            id="category"
            placeholder="Category"
            style={inputStyle}
          />
          {errors.category && <span style={errorStyle}>{errors.category.message}</span>}
        </Grid>
        <Grid>
          <input
            {...register('language')}
            id="language"
            placeholder="Language"
            style={inputStyle}
          />
          {errors.language && <span style={errorStyle}>{errors.language.message}</span>}
        </Grid>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default page
