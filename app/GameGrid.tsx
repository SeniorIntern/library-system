'use client'

import useGames from "./hooks/useGames"

const GameGrid = () => {
  const { books, isLoading, error } = useGames()
  console.log('books', books);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
    </div>
  )
}

export default GameGrid
