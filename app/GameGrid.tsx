'use client'

import useBooks from "./hooks/useBooks";

const GameGrid = () => {
  const { books, isLoading, error } = useBooks()
  console.log('books', books);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
    </div>
  )
}

export default GameGrid
