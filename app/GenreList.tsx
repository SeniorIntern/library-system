'use client'

import { Flex } from '@radix-ui/themes'
import useGenres from './hooks/useGenres'

type Props = {
  onSelectGenre: (genreId: string) => void
  selectedGenre: string | null
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { genres, isLoading, error } = useGenres()

  return (
    <div className='ml-4'>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
      <Flex direction="column" className='gap-4 mr-8'>
        {genres.map(genre => (
          <button
            className={`text-left ${selectedGenre === genre._id && `font-bold`}`}
            key={genre._id}
            onClick={() => onSelectGenre(genre._id)}
          >
            <p className='text-[1.15rem]'>{genre.name}</p>
          </button>
        ))}
      </Flex>
    </div>
  )
}

export default GenreList
