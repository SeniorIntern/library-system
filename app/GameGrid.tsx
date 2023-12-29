'use client'
import { useEffect } from 'react'
import axios from 'axios'

type Book = {
  _id: string,
  title: string,
  description: string,
  image_url: string,
}

const GameGrid = () => {
  useEffect(() => {
    axios.get<Book[]>('http://localhost:3001/api/books').then(data => console.log(data.data))
  }, [])

  return (
    <div>GameGrid</div>
  )
}

export default GameGrid
