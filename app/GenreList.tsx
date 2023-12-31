'use client'
import { Flex } from '@radix-ui/themes'
import useGenres from './hooks/useGenres'
import { Props } from './page'
import Link from 'next/link'

const GenreList = ({ searchParams }: Props) => {
  const { genres, isLoading, error } = useGenres()

  return (
    <div className='ml-4 mr-8'>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
      <Flex direction="column" className='gap-4'>
        {genres.map(genre => (
          <Link
            key={genre._id}
            href={{
              query: {
                ...searchParams,
                genre: genre.name
              }
            }}
          >
            <p className='text-[1.15rem]'>{genre.name}</p>
          </Link>
        ))}
      </Flex>
    </div>
  )
}

export default GenreList
