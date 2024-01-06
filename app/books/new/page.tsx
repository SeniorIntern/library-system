'use client'

import useCategories from "@/app/hooks/useCategories"
import useLanguages from "@/app/hooks/useLanguages"
import { apiClient } from "@/app/services/api-client"
import useUserStore from "@/app/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Grid } from "@radix-ui/themes"
import { redirect } from "next/navigation"
import { CSSProperties } from "react"
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'

const schema = z.object({
  title: z.string().min(3, { message: 'Title can not be less than 3 characters' }).max(40),
  description: z.string().min(10, { message: 'Descrition can not be less than 10 characters' }).max(255),
  author: z.string().min(3, { message: 'Author(s) name is required' }).max(255),
  image_url: z.string().min(1, { message: 'Image URL is required' }),
  thumbnail_url: z.string().min(1, { message: 'Thumbail URL is requried' }),
  category: z.string().min(1, { message: 'Category is requried' }),
  language: z.string().min(1, { message: 'Language is requried' })
})

type FormData = z.infer<typeof schema>

const page = () => {
  const { token } = useUserStore()

  const { categories, isLoading: isCategoryLoading, error: categoryErr } = useCategories()
  if (categoryErr) return null

  const { languages, isLoading: isLanguageLoading, error: languageErr } = useLanguages()
  if (languageErr) return null

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

  const { handleSubmit, register, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = (data: FieldValues) => {
    console.log('data=', data);

    const { title, description, author, image_url, thumbnail_url, category, language } = data
    apiClient.post('/books', { title, description, image_url, thumbnail_url, author, category, language })
      .then(() => {
        toast.success('New book added sucessfully!')
      }).catch((err) => toast.error(err?.message))
  }

  if (!token) return redirect('/login')

  return (
    <>
      <Toaster />
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
              rows={8}
              {...register('description', { required: true })}
              id="description"
              placeholder="Short Description"
              style={inputStyle}
            />
            {errors.description && <span style={errorStyle}>{errors.description.message}</span>}
          </Grid>
          <Grid>
            <input
              {...register('author', { required: true })}
              id="author"
              placeholder="Author(s)"
              style={inputStyle}
            />
            {errors.author && <span style={errorStyle}>{errors.author.message}</span>}
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
            <select
              {...register("category")}
              aria-placeholder="Book Category"
              style={inputStyle}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <span style={errorStyle}>{errors.category.message}</span>}
          </Grid>
          <Grid>
            <select
              {...register("language")}
              aria-placeholder="Book language"
              style={inputStyle}
            >
              <option value="">Select a language</option>
              {languages.map(language => (
                <option
                  key={language._id}
                  value={language._id}
                >
                  {language.language}
                </option>
              ))}
            </select>
            {errors.language && <span style={errorStyle}>{errors.language.message}</span>}
          </Grid>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  )
}

export default page
