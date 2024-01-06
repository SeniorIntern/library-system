'use client'

import { Flex } from '@radix-ui/themes'
import useGenres from './hooks/useGenres'

const GenreList = () => {
  const { genres, isLoading, error } = useGenres()

  return (
    <div className='ml-4 mr-8'>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
      <Flex direction="column" className='gap-4'>
        {genres.map(genre => (
          <button
            key={genre._id}
          >
            <p className='text-[1.15rem]'>{genre.name}</p>
          </button>
        ))}
      </Flex>
    </div>
  )
}

export default GenreList
