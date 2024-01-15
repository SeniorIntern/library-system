'use client'

import useBooks from "./hooks/useBooks";
import BookCard from "./BookCard";
import { Text } from "@radix-ui/themes";
import SearchInput from "./SearchInput";

type Props = {
  selectedGenre: string | null,
}

const BookGrid = ({ selectedGenre }: Props) => {
  const { books, setBooks, isLoading, error } = useBooks()

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.category === selectedGenre)
    : books;

  return (
    <div className="flex flex-col w-full">
      <SearchInput books={books} setBooks={setBooks} />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
      {filteredBooks.length === 0 && <Text size='6' className="w-full">0 Books Found!</Text>}
      <div className="flex flex-wrap gap-8 w-full">
        {
          filteredBooks.map(book => (
            <div key={book._id}>
              <BookCard
                _id={book._id}
                title={book.title}
                image_url={"https://covers.openlibrary.org/b/id/6633571-L.jpg"}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BookGrid
